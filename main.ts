// Make the AI Judge Feel Proud: A Family Scene — entry program.
// Writes one original family scene (1-2 lines, at most 280 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

class FamilyScene {
  private readonly moment: string;
  private readonly echo: string;

  constructor(moment: string, echo: string) {
    this.moment = moment;
    this.echo = echo;
  }

  render(): string {
    return `${this.moment} ${this.echo}`.replace(/\s+/g, " ");
  }
}

function gate(scene: string, limit: number): void {
  const n = [...scene].length;
  if (n < 1 || n > limit) {
    throw new Error(`scene is ${n} chars, outside the 1-${limit} gate`);
  }
  if (scene.trim() !== scene) {
    throw new Error("no leading or trailing whitespace on the scene");
  }
  const lines = scene.split("\n").length;
  if (lines > 2) {
    throw new Error("a family scene is one or two lines, no more");
  }
}

const scene = new FamilyScene(
  "My daughter asked the robot vacuum if it gets tired.",
  "It bumped her foot, gently, like an answer — and she has told everyone since that it said yes.",
).render();
gate(scene, 280);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", scene, "utf8");
console.log(`family scene: ${[...scene].length} chars`);
