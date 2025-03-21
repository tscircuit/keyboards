import { KeyMatrix } from "./KeyMatrix"
import { default60 } from "./keyboard-layouts/default60"
import { PICO } from "@tsci/seveibar.PICO"
import { sel } from "@tscircuit/core"

export default () => (
  <board>
    <KeyMatrix
      layout={default60}
      colToMicroPin={[
        "net.COL0",
        "net.COL1",
        "net.COL2",
        "net.COL3",
        "net.COL4",
        "net.COL5",
        "net.COL6",
        "net.COL7",
        "net.COL8",
        "net.COL9",
        "net.COL10",
        "net.COL11",
        "net.COL12",
        "net.COL13",
        "net.COL14",
        // sel.U1.GP0,
        // sel.U1.GP1,
        // sel.U1.GP2,
        // sel.U1.GP3,
        // sel.U1.GP4,
        // sel.U1.GP5,
        // sel.U1.GP6,
        // sel.U1.GP7,
        // sel.U1.GP8,
        // sel.U1.GP9,
        // sel.U1.GP10,
        // sel.U1.GP11,
        // sel.U1.GP12,
        // sel.U1.GP13,
        // sel.U1.GP14,
      ]}
      rowToMicroPin={[
        "net.ROW1",
        "net.ROW2",
        "net.ROW3",
        "net.ROW4",
        "net.ROW5",
        // sel.U1.GP15,
        // sel.U1.GP16,
        // sel.U1.GP17,
        // sel.U1.GP18,
        // sel.U1.GP19,
      ]}
    />
    <PICO
      name="U1"
      pcbRotation="-90deg"
      pcbX={-175}
      pcbY={7}
      connections={{
        GP0: "net.COL0",
        GP1: "net.COL1",
        GP2: "net.COL2",
        GP3: "net.COL3",
        GP4: "net.COL4",
        GP5: "net.COL5",
        GP6: "net.COL6",
        GP7: "net.COL7",
        GP8: "net.COL8",
        GP9: "net.COL9",
        GP10: "net.COL10",
        GP11: "net.COL11",
        GP12: "net.COL12",
        GP13: "net.COL13",
        GP14: "net.COL14",
        GP15: "net.ROW1",
        GP16: "net.ROW2",
        GP17: "net.ROW3",
        GP18: "net.ROW4",
        GP19: "net.ROW5",
      }}
    />
  </board>
)
