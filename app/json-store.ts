import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import path from "node:path";

export interface JsonStore<T> {
  read(): Promise<T>;
  write(value: T): Promise<void>;
  update(mutator: (current: T) => T | Promise<T>): Promise<T>;
}

// ---- Upstash Redis implementation (production) -----------------------

function createRedisStore<T>(key: string, fallback: T): JsonStore<T> {
  async function getRedis() {
    const { Redis } = await import("@upstash/redis");
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }

  async function read(): Promise<T> {
    const redis = await getRedis();
    const value = await redis.get<T>(key);
    return value ?? fallback;
  }

  async function write(value: T): Promise<void> {
    const redis = await getRedis();
    await redis.set(key, value);
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
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const key = fileName.replace(".json", "");
    return createRedisStore<T>(key, fallback);
  }
  return createFileStore<T>(fileName, fallback);
}
