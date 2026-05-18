import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function loadArchivoFont(): Promise<ArrayBuffer> {
  const font = await readFile(join(process.cwd(), "public/fonts/archivo.ttf"));
  return font.buffer.slice(
    font.byteOffset,
    font.byteOffset + font.byteLength,
  ) as ArrayBuffer;
}
