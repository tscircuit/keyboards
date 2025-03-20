import { Keyboard } from "./Keyboard"
import { default60 } from "./keyboard-layouts/default60"

export default () => (
  <board>
    <Keyboard layout={default60} />
  </board>
)
