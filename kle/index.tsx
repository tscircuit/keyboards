import { Keyboard } from "./Keyboard.tsx"

const layout = [
  ["Esc", "1"],
  ["Tab", "Q"],
]

export default () => (
  <board width="10mm" height="10mm">
    <Keyboard layout={layout} />
  </board>
)
