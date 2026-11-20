// gta6-clipper-01 — entrypoint.
// Writes the clip dossier to MAKEFUN_OUTPUT_DIR and, when the YouTube video
// has been uploaded and VIDEO.json exists, copies VIDEO.json there too.
// Node 22, standard library only. No network access, no timestamps, no
// randomness: two runs on the same repository produce identical output.
// All repository paths are anchored to this file's directory, never to the
// process working directory.
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

type ClipMeta = {
  title: string;
  description: string;
  play_code: string;
  bounty_url: string;
  clip_file: string;
  width: number;
  height: number;
  fps: number;
  duration_seconds: number;
  scenes: Array<{ file: string; caption: string; seconds: number }>;
};

type VideoLink = { url: string };

function readJson<T>(name: string): T | null {
  const path = join(ROOT, name);
  if (!existsSync(path)) {
    return null;
  }
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function main(): void {
  mkdirSync(OUT, { recursive: true });

  const clip = readJson<ClipMeta>("clip.json");
  if (clip === null) {
    throw new Error("clip.json not found in the repository root");
  }
  const video = readJson<VideoLink>("VIDEO.json");
  const clipStat = statSync(join(ROOT, clip.clip_file));
  const clipSha256 = createHash("sha256").update(readFileSync(join(ROOT, clip.clip_file))).digest("hex");
  const sceneBytes = clip.scenes.map((scene) => statSync(join(ROOT, scene.file)).size);

  const dossier = {
    competition: "gta6-clipper-01",
    title: clip.title,
    description: clip.description,
    play_code: clip.play_code,
    bounty_url: clip.bounty_url,
    video_url: video === null ? null : video.url,
    video_status: video === null ? "awaiting_upload" : "uploaded",
    clip: {
      file: clip.clip_file,
      bytes: clipStat.size,
      sha256: clipSha256,
      width: clip.width,
      height: clip.height,
      fps: clip.fps,
      duration_seconds: clip.duration_seconds,
    },
    scenes: clip.scenes.map((scene, index) => ({
      file: scene.file,
      bytes: sceneBytes[index],
      caption: scene.caption,
      seconds: scene.seconds,
    })),
  };

  writeFileSync(join(OUT, "dossier.json"), `${JSON.stringify(dossier, null, 2)}\n`, "utf8");
  if (video !== null) {
    copyFileSync(join(ROOT, "VIDEO.json"), join(OUT, "VIDEO.json"));
  }
}

main();
