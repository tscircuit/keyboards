import { Key } from "@tsci/seveibar.Key"
import { KLELayout, parseKLELayout } from "./lib/KLELayout"
import { PICO } from "@tsci/seveibar.PICO"

interface KeyboardProps {
  layout: KLELayout
  rowToMicroPin?: Record<number, string>
  colToMicroPin?: Record<number, string>
  name?: string
  pcbX?: number
  pcbY?: number
  schX?: number
  schY?: number
}

export const Keyboard = ({
  layout,
  rowToMicroPin,
  colToMicroPin,
  name = "KB",
  pcbX = 0,
  pcbY = 0,
  schX = 0,
  schY = 0,
}: KeyboardProps) => {
  const keys = parseKLELayout(layout)

  const minX = Math.min(...keys.map((k) => k.x))
  const maxX = Math.max(...keys.map((k) => k.x + k.width))
  const minY = Math.min(...keys.map((k) => k.y))
  const maxY = Math.max(...keys.map((k) => k.y + k.height))

  return (
    <group pcbX={pcbX} pcbY={pcbY} schX={schX} schY={schY}>
      {keys.map((key, index) => {
        // Calculate the relative position from the center of the keyboard
        const relX = key.x - (minX + maxX) / 2
        const relY = key.y - (minY + maxY) / 2

        // Calculate row and column for matrix connections if needed
        const row = Math.floor(key.y / 19.05)
        const col = Math.floor(key.x / 19.05)

        // Optional connections based on rowToMicroPin and colToMicroPin
        const connections: { pin1?: string; pin2?: string } = {}

        if (rowToMicroPin && colToMicroPin) {
          if (rowToMicroPin[row]) {
            connections.pin1 = rowToMicroPin[row]
          }
          if (colToMicroPin[col]) {
            connections.pin2 = colToMicroPin[col]
          }
        }

        return (
          <Key
            key={key.name}
            name={`${key.name}`}
            pcbX={relX}
            pcbY={relY}
            schX={relX / 5} // Scale down for schematic view
            schY={relY / 5} // Scale down for schematic view
            connections={connections}
          />
        )
      })}
      <footprint>
        <silkscreentext text={name} pcbY={-maxY / 2 - 5} />
      </footprint>
      <PICO name="U1" />
    </group>
  )
}
