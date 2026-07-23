// 鍛造:fish153-bubble → 會幕・甘心奉獻(出 35:5,21;36:7)。彈珠配對反向化=歸進庫房。
// newBlock 一律不含 endAnchor。
import fs from 'fs'
import path from 'path'
const ROOT = path.resolve(import.meta.dirname, '..')
const P = (f) => path.join(ROOT, f)
function repl(src, from, to, tag) {
  if (!src.includes(from)) { console.error('🔴 缺錨:', tag); process.exit(1) }
  return src.replace(from, to)
}
function replRange(src, startAnchor, endAnchor, newBlock, tag) {
  const i = src.indexOf(startAnchor)
  const j = src.indexOf(endAnchor, i + 1)
  if (i < 0 || j < 0) { console.error('🔴 缺區段錨:', tag); process.exit(1) }
  return src.slice(0, i) + newBlock + src.slice(j)
}

let g = fs.readFileSync(P('game.js'), 'utf8')

g = replRange(g, '// 網滿大魚・一五三', '(function () {', `// 會幕・甘心奉獻(出 35:5,21;36:7)——彈珠配對(泡泡龍反向化)+ tsum 皮第二發(fork fish153-bubble)。
// bubble-match 範式已核可清單「會幕甘心奉獻歸庫(出 35)」;文案為 AI 依和合本草擬
// (引文均經 cuv MCP 逐字查證:出 35:5、35:21、36:7),牧者已核可題材(07-23)。
//
// 玩法:百姓把禮物帶來了!瞄準+發射,把奉獻物送到同類旁邊——湊滿 3 件=一起歸進會幕的庫房
//   (不是消失!);全部歸庫——「他們所有的材料夠做一切當做的物,而且有餘」!
// ★ 神學守法:①歸庫不是消除;②離手的(懸空)=受感的心,主都收下;③永不會輸:無射數限制、
//   堆太低=先收進庫房;④信息=甘心樂意(35:5,21)+夠用有餘(36:7)——奉獻不是攤派,是受感的心。
// 年齡三檔:幼(3 種禮物・3 排)/童(4 種・4 排)/青(5 種・禮物越拿越多)。
`, 'header')

g = repl(g, "    young: { label: '🐣 幼', desc: '3 種魚・3 排', kinds: 3, rows: 3, cols: 8, grow: 0, guide: 150 },",
  "    young: { label: '🐣 幼', desc: '3 種禮物・3 排', kinds: 3, rows: 3, cols: 8, grow: 0, guide: 150 },", 'age-y')
g = repl(g, "    kid: { label: '🙂 童', desc: '4 種魚・4 排', kinds: 4, rows: 4, cols: 9, grow: 9, guide: 130 },",
  "    kid: { label: '🙂 童', desc: '4 種禮物・4 排', kinds: 4, rows: 4, cols: 9, grow: 9, guide: 130 },", 'age-k')
g = repl(g, "    teen: { label: '🔥 青', desc: '5 種・魚越聚越多', kinds: 5, rows: 5, cols: 10, grow: 6, guide: 70 },",
  "    teen: { label: '🔥 青', desc: '5 種・禮物越拿越多', kinds: 5, rows: 5, cols: 10, grow: 6, guide: 70 },", 'age-t')

g = repl(g, "const KINDS = ['bluefish', 'goldfish', 'redfish', 'grayfish', 'greenfish']",
  "const KINDS = ['gold', 'blue', 'purple', 'scarlet', 'wood']", 'kinds')

g = replRange(g, '  const T = {', '\n\n  const VOICES', `  const T = {
    title: '⛺ 會幕・甘心奉獻',
    ref: '出埃及記 35:5,21',
    intro1: '「你們中間要拿禮物獻給耶和華，凡樂意獻的可以拿耶和華的禮物來，就是金、銀、銅，」(出 35:5)',
    how: '百姓把禮物帶來了!移動滑鼠(或手指)瞄準、放開發射,把奉獻物送到同類旁邊——湊滿 3 件,一起歸進會幕的庫房。全部歸庫——材料夠用,而且有餘!',
    pick: '凡心裡受感的,都拿禮物來。選一場奉獻:',
    hud: (n, net) => \`⛺ 場上還有 \${n} 件 ・ 庫房 \${net} 件\`,
    gather: '甘心樂意,歸入庫房!',
    float: '受感的心,主都收下…',
    more: '又有百姓拿禮物來了…',
    low: '摩西吩咐先把下層收進庫房…',
    closeLine: '因為他們所有的材料夠做一切當做的物，而且有餘。(出 36:7)',
    winTitle: '🎉 夠用,而且有餘!',
    winVerse: '因為他們所有的材料夠做一切當做的物，而且有餘。',
    winRef: '出埃及記 36:7',
    teachVerse: '凡心裡受感和甘心樂意的都拿耶和華的禮物來，用以做會幕和其中一切的使用，又用以做聖衣。',
    teachRef: '出埃及記 35:21',
    teach: '會幕不是靠攤派蓋起來的——是「凡心裡受感和甘心樂意的」把禮物拿來,拿到摩西要出令攔住(出 36:6)。神愛甘心樂意的奉獻:金環是你的、線是你織的、木是你扛的,祂都收進祂的工,而且永遠夠用有餘。',
    review: '文案待牧者審核・經文均經和合本逐句核對',
  }`, 'T')

g = repl(g, "window.__ping('fish153-bubble' + suffix, t)", "window.__ping('tabernacle-bubble' + suffix, t)", 'ping')

// 曠野天色(取代海面)
g = repl(g, "      sky.addColorStop(0, '#f0c8a0'); sky.addColorStop(0.35, '#c8b8c8'); sky.addColorStop(0.6, '#7aa4c4'); sky.addColorStop(1, '#4a7a9c')",
  "      sky.addColorStop(0, '#bcd0e4'); sky.addColorStop(0.4, '#e8d8ac'); sky.addColorStop(0.7, '#d8b878'); sky.addColorStop(1, '#c09858')", 'sky')
g = replRange(g, '      // 海面微波', '      if (this.state === \'intro\')', `      // 沙丘紋
      ctx.strokeStyle = 'rgba(120,90,45,0.18)'; ctx.lineWidth = 2
      for (let i = 0; i < 4; i++) {
        const wy = VH * 0.6 + i * 34
        ctx.beginPath()
        for (let x = 0; x <= VW; x += 30) {
          const y = wy + Math.sin(x * 0.012 + i * 2) * 8
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
`, 'dunes')

// 會幕(取代船+網)
g = replRange(g, '    // 船+網(closed=網拉上岸+炭火早飯,約21:9)', '    // tsum 圓魚(五款:色+特徵雙重分辨;都有眼/腮紅/微笑)', `    // 會幕(closed=完工,幕上發光)
    _net(closed) {
      const { ctx } = this
      const x = NET.x, y = NET.y
      // 院子圍欄(柱+幔)
      ctx.strokeStyle = '#c8b890'; ctx.lineWidth = 3
      ctx.beginPath(); ctx.moveTo(x - 78, y + 24); ctx.lineTo(x + 78, y + 24); ctx.stroke()
      for (const dx of [-78, -39, 0, 39, 78]) {
        ctx.fillStyle = '#8a6a3a'
        ctx.fillRect(x + dx - 2, y + 8, 4, 18)
      }
      // 幕體(兩層頂)
      ctx.fillStyle = '#7a5a34'
      ctx.beginPath(); ctx.moveTo(x - 56, y + 8); ctx.lineTo(x - 44, y - 34); ctx.lineTo(x + 44, y - 34); ctx.lineTo(x + 56, y + 8); ctx.closePath(); ctx.fill()
      ctx.fillStyle = '#9a7444'
      ctx.beginPath(); ctx.moveTo(x - 44, y - 34); ctx.lineTo(x - 34, y - 52); ctx.lineTo(x + 34, y - 52); ctx.lineTo(x + 44, y - 34); ctx.closePath(); ctx.fill()
      // 門幔(藍紫朱紅,出 36:37 語意的三色門簾)
      const doorW = 26, doorH = 30
      const cols3 = ['#4a6aa8', '#7a4a8a', '#b84a4a']
      cols3.forEach((c3, i) => {
        ctx.fillStyle = c3
        ctx.fillRect(x - doorW / 2 + (i * doorW) / 3, y + 8 - doorH, doorW / 3, doorH)
      })
      if (closed) {
        const glow = ctx.createRadialGradient(x, y - 20, 6, x, y - 20, 110)
        glow.addColorStop(0, 'rgba(255,240,180,0.55)'); glow.addColorStop(1, 'rgba(255,240,180,0)')
        ctx.fillStyle = glow
        ctx.beginPath(); ctx.arc(x, y - 20, 110, 0, 7); ctx.fill()
      }
      ctx.fillStyle = '#3c2c14'
      ctx.font = '13px "Noto Sans TC","Microsoft JhengHei",sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('會幕庫房', x, y + 50)
    }

`, 'tabernacle')

// 五款奉獻物(取代五款魚)
g = replRange(g, '    _fish(x, y, r, kind) {', `    _drawIntro() {`, `    _fish(x, y, r, kind) {
      const { ctx } = this
      ctx.save()
      ctx.translate(x, y)
      const face = (fy = 0) => {
        const er = r * 0.11
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(-r * 0.24, fy - r * 0.1, er * 1.5, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.arc(r * 0.24, fy - r * 0.1, er * 1.5, 0, 7); ctx.fill()
        ctx.fillStyle = '#2c2416'
        ctx.beginPath(); ctx.arc(-r * 0.22, fy - r * 0.08, er, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.arc(r * 0.26, fy - r * 0.08, er, 0, 7); ctx.fill()
        ctx.fillStyle = 'rgba(240,120,120,0.4)'
        ctx.beginPath(); ctx.arc(-r * 0.42, fy + r * 0.14, er * 1.1, 0, 7); ctx.fill()
        ctx.beginPath(); ctx.arc(r * 0.42, fy + r * 0.14, er * 1.1, 0, 7); ctx.fill()
        ctx.strokeStyle = '#4a3420'; ctx.lineWidth = Math.max(1.2, r * 0.05)
        ctx.beginPath(); ctx.arc(0, fy + r * 0.1, r * 0.14, 0.25 * Math.PI, 0.75 * Math.PI); ctx.stroke()
      }
      const ball = (col, line) => {
        ctx.fillStyle = col
        ctx.beginPath(); ctx.arc(0, 0, r * 0.85, 0, 7); ctx.fill()
        ctx.strokeStyle = line; ctx.lineWidth = Math.max(1.4, r * 0.06)
        ctx.beginPath(); ctx.arc(0, 0, r * 0.85, 0, 7); ctx.stroke()
      }
      const yarn = (col, line, pattern) => { // 線團:纏線紋各款不同
        ball(col, line)
        ctx.strokeStyle = line; ctx.lineWidth = Math.max(1.4, r * 0.07)
        if (pattern === 'h') {
          for (const k2 of [-0.45, 0, 0.45]) { ctx.beginPath(); ctx.ellipse(0, k2 * r * 0.6, r * 0.78, r * 0.28, 0, 0, 7); ctx.stroke() }
        } else if (pattern === 'd') {
          for (const k2 of [-0.4, 0.05, 0.5]) { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.8, r * 0.3, k2 * 1.6, 0, 7); ctx.stroke() }
        } else {
          ctx.beginPath(); ctx.ellipse(0, 0, r * 0.78, r * 0.3, 0.7, 0, 7); ctx.stroke()
          ctx.beginPath(); ctx.ellipse(0, 0, r * 0.78, r * 0.3, -0.7, 0, 7); ctx.stroke()
        }
        // 線頭
        ctx.beginPath(); ctx.moveTo(r * 0.6, -r * 0.6); ctx.quadraticCurveTo(r * 1.05, -r * 0.75, r * 1.0, -r * 0.4); ctx.stroke()
      }
      if (kind === 'gold') { // 金環(出35:22 金器)
        ball('#e8c060', '#c49c3c')
        ctx.strokeStyle = '#a8842c'; ctx.lineWidth = Math.max(3, r * 0.16)
        ctx.beginPath(); ctx.arc(0, -r * 0.38, r * 0.3, 0, 7); ctx.stroke()
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.beginPath(); ctx.arc(-r * 0.14, -r * 0.55, r * 0.07, 0, 7); ctx.fill()
        face(r * 0.14)
      } else if (kind === 'blue') { // 藍色線團
        yarn('#6a8cc8', '#4a6ca8', 'h')
        face()
      } else if (kind === 'purple') { // 紫色線團
        yarn('#9a6ab8', '#7a4a98', 'd')
        face()
      } else if (kind === 'scarlet') { // 朱紅色線團
        yarn('#c85a4a', '#a83c2c', 'x')
        face()
      } else { // wood 皂莢木塊
        ball('#b08a58', '#8f6c3e')
        ctx.strokeStyle = '#7a5a30'; ctx.lineWidth = Math.max(1.3, r * 0.06)
        ctx.beginPath(); ctx.arc(-r * 0.2, -r * 0.42, r * 0.16, 0, 7); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(-r * 0.7, -r * 0.16); ctx.quadraticCurveTo(0, -r * 0.3, r * 0.7, -r * 0.14); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(-r * 0.6, r * 0.5); ctx.quadraticCurveTo(0, r * 0.36, r * 0.62, r * 0.5); ctx.stroke()
        face()
      }
      ctx.restore()
    }

    `, 'items')

// 發射台:漁夫→奉獻的百姓;「下一條」→「下一件」
g = repl(g, "        // 彼得(簡筆漁夫)\n        ctx.fillStyle = '#5a6a8a'", "        // 奉獻的百姓(簡筆)\n        ctx.fillStyle = '#8a6a4a'", 'figure')
g = repl(g, "ctx.fillText('下一條', sx + 74, sy + 4)", "ctx.fillText('下一件', sx + 74, sy + 4)", 'next-label')
g = repl(g, "ctx.fillText(`${T.hud(this.grid.size, this.arkCount)} ・ ←→瞄準 空白鍵發射`, VW / 2, 29)",
  "ctx.fillText(`${T.hud(this.grid.size, this.arkCount)} ・ ←→瞄準 空白鍵發射`, VW / 2, 29)", 'hud-keep')

// intro 示範+副標
g = repl(g, "      this._fish(VW * 0.36, VH * 0.62, 22, 'goldfish')\n      this._fish(VW * 0.5, VH * 0.62, 22, 'redfish')\n      this._fish(VW * 0.64, VH * 0.62, 22, 'bluefish')",
  "      this._fish(VW * 0.36, VH * 0.62, 22, 'gold')\n      this._fish(VW * 0.5, VH * 0.62, 22, 'scarlet')\n      this._fish(VW * 0.64, VH * 0.62, 22, 'blue')", 'demo')
g = repl(g, "ctx.fillText(T.ref + ' ・ 網卻沒有破', VW / 2, VH * 0.23)",
  "ctx.fillText(T.ref + ' ・ 甘心樂意', VW / 2, VH * 0.23)", 'intro-sub')
g = repl(g, "ctx.fillText(`網裡一共 ${this.arkCount} 條——魚雖多,網卻沒有破`, W / 2, H * 0.235)",
  "ctx.fillText(`庫房裡一共 ${this.arkCount} 件——夠用,而且有餘`, W / 2, H * 0.235)", 'win-sub')

fs.writeFileSync(P('game.js'), g)

// ── index.html / sw / manifest / gen-tts / verify ──
let h = fs.readFileSync(P('index.html'), 'utf8')
h = repl(h, '<title>網滿大魚・一五三</title>', '<title>會幕・甘心奉獻</title>', 'title')
h = repl(h, '<meta name="description" content="瞄準發射,把魚送到同類旁邊——湊滿 3 條一起游進網裡!共一百五十三條,網卻沒有破(約翰福音 21,和合本)">',
  '<meta name="description" content="瞄準發射,把奉獻物送到同類旁邊——湊滿 3 件一起歸進會幕庫房!材料夠用而且有餘(出埃及記 35-36,和合本)">', 'desc')
h = repl(h, '<meta name="theme-color" content="#4a7a9c">', '<meta name="theme-color" content="#c09858">', 'theme')
h = repl(h, 'background:#4a7a9c', 'background:#c09858', 'bg')
h = repl(h, '📱 請把手機轉成橫向<br>船和魚群都在等你!', '📱 請把手機轉成橫向<br>會幕和禮物都在等你!', 'rotate')
h = repl(h, "var k = 'ping-fish153-bubble'", "var k = 'ping-tabernacle-bubble'", 'ping-key')
h = repl(h, "window.__ping('fish153-bubble')", "window.__ping('tabernacle-bubble')", 'ping-id')
fs.writeFileSync(P('index.html'), h)

let s = fs.readFileSync(P('sw.js'), 'utf8')
s = repl(s, "var CACHE_NAME = 'fish153-bubble-v1';", "var CACHE_NAME = 'tabernacle-bubble-v1';", 'sw')
fs.writeFileSync(P('sw.js'), s)

let m = fs.readFileSync(P('manifest.webmanifest'), 'utf8')
m = m.replace('網滿大魚・一五三', '會幕・甘心奉獻').replace('"short_name": "網滿大魚"', '"short_name": "會幕奉獻"')
m = m.replace('瞄準發射,把魚送到同類旁邊——湊滿 3 條一起游進網裡!共一百五十三條,網卻沒有破(約翰福音 21,和合本)', '瞄準發射,把奉獻物送到同類旁邊——湊滿 3 件一起歸進會幕庫房!材料夠用而且有餘(出埃及記 35-36,和合本)')
m = m.replace('"background_color": "#4a7a9c"', '"background_color": "#c09858"').replace('"theme_color": "#1c3a50"', '"theme_color": "#7a5a34"')
fs.writeFileSync(P('manifest.webmanifest'), m)

let t = fs.readFileSync(P('scripts/gen-tts.mjs'), 'utf8')
t = replRange(t, "  ['intro',", '];', `  ['intro', '你們中間要拿禮物獻給耶和華,凡樂意獻的可以拿耶和華的禮物來,就是金、銀、銅。'],
  ['bless', '凡心裡受感和甘心樂意的都拿耶和華的禮物來,用以做會幕和其中一切的使用,又用以做聖衣。'],
  ['win', '因為他們所有的材料夠做一切當做的物,而且有餘。出埃及記三十六章七節。']
`, 'tts-lines')
fs.writeFileSync(P('scripts/gen-tts.mjs'), t)

let v = fs.readFileSync(P('scripts/verify.mjs'), 'utf8')
v = v.replaceAll("'bluefish'", "'gold'")
fs.writeFileSync(P('scripts/verify.mjs'), v)

console.log('🟢 鍛造完成:會幕・甘心奉獻')
