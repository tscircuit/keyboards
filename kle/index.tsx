import { KeyMatrix } from "./KeyMatrix"
import { default60 } from "./keyboard-layouts/default60"
import { PICO } from "@tsci/seveibar.PICO"
import { sel } from "@tscircuit/core"

export default () => (
  <board>
    <KeyMatrix
      layout={default60}
      colToMicroPin={[sel.U1.GP1, sel.U1.GP2]}
      rowToMicroPin={[sel.U1.GP3, sel.U1.GP4]}
    />
    <PICO name="U1" pcbRotation="-90deg" pcbX={-175} pcbY={7} />
  </board>
)
