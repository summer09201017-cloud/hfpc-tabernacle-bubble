// 烤曉臻(zh-TW-HsiaoChenNeural)語音三句 → voice/*.mp3(逐句落盤,重跑到「新產 0」即完成)
// 相依免另裝:依序找本機已有 msedge-tts 的 node_modules(paul-game 同層 → Desktop 3D 球類)
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import os from 'os';
const CANDIDATES = [
  path.resolve(import.meta.dirname, '..', '..', 'hfpc-paul-game', 'node_modules'),
  path.join(os.homedir(), 'Desktop', 'baseball3d', 'node_modules'),
  path.join(os.homedir(), 'Desktop', 'basketball3d', 'node_modules'),
];
const root = CANDIDATES.find((p) => fs.existsSync(path.join(p, 'msedge-tts')));
if (!root) { console.error('找不到 msedge-tts,請在任一候選路徑 npm i msedge-tts'); process.exit(1); }
const require2 = createRequire(root + path.sep);
const { MsEdgeTTS, OUTPUT_FORMAT } = require2('msedge-tts');

const OUT = path.resolve(import.meta.dirname, '..', 'voice');
fs.mkdirSync(OUT, { recursive: true });
// 經文均經 cuv MCP 逐字查證(創 6:19、9:13、7:16,和合本)
const LINES = [
  ['intro', '你們中間要拿禮物獻給耶和華,凡樂意獻的可以拿耶和華的禮物來,就是金、銀、銅。'],
  ['bless', '凡心裡受感和甘心樂意的都拿耶和華的禮物來,用以做會幕和其中一切的使用,又用以做聖衣。'],
  ['win', '因為他們所有的材料夠做一切當做的物,而且有餘。出埃及記三十六章七節。']
];
let made = 0;
for (const [name, text] of LINES) {
  const file = path.join(OUT, name + '.mp3');
  if (fs.existsSync(file) && fs.statSync(file).size > 2000) continue;
  const tts = new MsEdgeTTS();
  await tts.setMetadata('zh-TW-HsiaoChenNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = await tts.toStream(text);
  const chunks = [];
  await new Promise((res, rej) => {
    audioStream.on('data', c => chunks.push(c));
    audioStream.on('end', res);
    audioStream.on('error', rej);
  });
  fs.writeFileSync(file, Buffer.concat(chunks));
  made++;
  console.log('baked', name, fs.statSync(file).size, 'bytes');
}
console.log('新產', made, '個檔;voice/ 共', fs.readdirSync(OUT).length, '個 mp3');
