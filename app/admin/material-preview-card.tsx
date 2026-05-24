"use client";

import { groupFilesByYear } from "../file-utils";
import { isImageFile } from "../material-types";
import type { AdminEntry } from "../material-types";
import type { ImportedFile } from "../file-utils";

function FileOrImage({ file, entryId }: { file: ImportedFile; entryId: string }) {
  if (isImageFile(file.href)) {
    return (
      <figure className="material-image">
        <a href={file.href} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={file.href} alt={file.text || ""} loading="lazy" />
        </a>
      </figure>
    );
  }
  return (
    <a href={file.href} target="_blank" rel="noreferrer" key={`${entryId}-${file.href}`}>
      {file.text}
    </a>
  );
}

/** Renders a material card exactly as it appears on the public page. */
export function MaterialPreviewCard({ entry }: { entry: AdminEntry }) {
  const imageFiles = entry.files.filter((f) => isImageFile(f.href));
  const otherFiles = entry.files.filter((f) => !isImageFile(f.href));

  return (
    <article className="material-card material-card--preview">
      <div>
        <span className="material-date">{entry.date}</span>
        <h4>{entry.title}</h4>
        {entry.body ? <p>{entry.body}</p> : null}
      </div>
      {imageFiles.length > 0 ? (
        <div className="material-images">
          {imageFiles.map((file) => (
            <FileOrImage file={file} entryId={entry.id} key={`${entry.id}-${file.href}`} />
          ))}
        </div>
      ) : null}
      {otherFiles.length > 0 ? (
        <div className="year-file-groups">
          {groupFilesByYear(otherFiles).map(([year, files]) => (
            <div className="year-file-group" key={year}>
              <strong>{year}</strong>
              <div className="file-list">
                {files.map((file) => (
                  <FileOrImage file={file} entryId={entry.id} key={`${entry.id}-${file.href}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
