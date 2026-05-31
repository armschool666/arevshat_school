import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";

export interface JsonStore<T> {
  read(): Promise<T>;
  write(value: T): Promise<void>;
  update(mutator: (current: T) => T | Promise<T>): Promise<T>;
}

// ---- Vercel Blob implementation (production) -------------------------

function createBlobStore<T>(fileName: string, fallback: T): JsonStore<T> {
  const blobPath = `data/${fileName}`;

  const storeOpts = () =>
    process.env.BLOB_AREVSHAT_STORE_ID
      ? { storeId: process.env.BLOB_AREVSHAT_STORE_ID }
      : {};

  async function read(): Promise<T> {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: blobPath, ...storeOpts() });
    const blob = blobs.find((b) => b.pathname === blobPath);
    if (!blob) return fallback;
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return fallback;
    return res.json() as Promise<T>;
  }

  async function write(value: T): Promise<void> {
    const { put } = await import("@vercel/blob");
    await put(blobPath, JSON.stringify(value), {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
      ...storeOpts(),
    });
  }

  return {
    read,
    write,
    update: async (mutator) => {
      const current = await read();
      const next = await mutator(current);
      await write(next);
      return next;
    },
  };
}

// ---- File-based implementation (local dev) ----------------------------

const dataDir = path.join(process.cwd(), "data");
const locks = new Map<string, Promise<unknown>>();

function withLock<T>(filePath: string, task: () => Promise<T>): Promise<T> {
  const previous = locks.get(filePath) ?? Promise.resolve();
  const next = previous.then(task, task);
  locks.set(
    filePath,
    next.catch(() => undefined),
  );
  return next;
}

async function atomicWrite(filePath: string, contents: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmp = `${filePath}.${randomBytes(6).toString("hex")}.tmp`;
  await writeFile(tmp, contents, "utf8");
  await rename(tmp, filePath);
}

function createFileStore<T>(fileName: string, fallback: T): JsonStore<T> {
  const filePath = path.join(dataDir, fileName);

  async function readRaw(): Promise<T> {
    try {
      const raw = await readFile(filePath, "utf8");
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  async function writeRaw(value: T): Promise<void> {
    await atomicWrite(filePath, JSON.stringify(value, null, 2));
  }

  return {
    read: () => withLock(filePath, readRaw),
    write: (value) => withLock(filePath, () => writeRaw(value)),
    update: (mutator) =>
      withLock(filePath, async () => {
        const current = await readRaw();
        const next = await mutator(current);
        await writeRaw(next);
        return next;
      }),
  };
}

// ---- Public API -------------------------------------------------------

export function createJsonStore<T>(fileName: string, fallback: T): JsonStore<T> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return createBlobStore<T>(fileName, fallback);
  }
  return createFileStore<T>(fileName, fallback);
}
