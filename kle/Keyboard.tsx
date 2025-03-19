import { Key } from "@tsci/seveibar.Key"

// Define the types for keyboard-layout-editor.com JSON format
type KLEKey =
  | string
  | {
      x?: number
      y?: number
      w?: number
      h?: number
      x2?: number
      y2?: number
      w2?: number
      h2?: number
      r?: number
      rx?: number
      ry?: number
      n?: boolean
      l?: boolean
      d?: boolean
      g?: boolean
      sm?: string
      sb?: string
      st?: string
    }

type KLELayout = KLEKey[][]

// Helper function to parse keyboard-layout-editor JSON
const parseKLELayout = (layout: KLELayout) => {
  // Default key size in millimeters
  const KEY_SIZE = 19.05 // Standard keycap size (19.05mm or 0.75 inches)
  const keys: Array<{
    name: string
    x: number
    y: number
    width: number
    height: number
    rotation: number
    rotationX: number
    rotationY: number
  }> = []

  let currentX = 0
  let currentY = 0
  let currentRotation = 0
  let currentRotationX = 0
  let currentRotationY = 0
  let keyCount = 1

  // Default properties for keys
  let currentProps = {
    width: 1,
    height: 1,
    x: 0,
    y: 0,
  }

  layout.forEach((row) => {
    currentX = 0

    // Process each item in the row
    row.forEach((item) => {
      // If it's an object, it's a key with special properties
      if (typeof item === "object") {
        // Update current properties based on the item
        if (item.x !== undefined) currentX += item.x
        if (item.y !== undefined) currentY += item.y
        if (item.w !== undefined) currentProps.width = item.w
        if (item.h !== undefined) currentProps.height = item.h
        if (item.r !== undefined) currentRotation = item.r
        if (item.rx !== undefined) currentRotationX = item.rx
        if (item.ry !== undefined) currentRotationY = item.ry
      }
      // If it's a string, it's a key label
      else if (typeof item === "string" && item.length > 0) {
        const keyLabel = `K${keyCount}`
        keys.push({
          name: keyLabel,
          x: currentX * KEY_SIZE,
          y: currentY * KEY_SIZE,
          width: currentProps.width * KEY_SIZE,
          height: currentProps.height * KEY_SIZE,
          rotation: currentRotation,
          rotationX: currentRotationX * KEY_SIZE,
          rotationY: currentRotationY * KEY_SIZE,
        })

        // Move to the next position
        currentX += currentProps.width
        keyCount++

        // Reset width and height to default for the next key
        currentProps.width = 1
        currentProps.height = 1
      }
    })

    // Move to the next row
    currentY++
  })

  return keys
}

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

  // Determine the bounding box of the keyboard
  const minX = Math.min(...keys.map((k) => k.x))
  const maxX = Math.max(...keys.map((k) => k.x + k.width))
  const minY = Math.min(...keys.map((k) => k.y))
  const maxY = Math.max(...keys.map((k) => k.y + k.height))

  const width = maxX - minX + 20 // Add some margin
  const height = maxY - minY + 20 // Add some margin

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
            name={`${name}_${key.name}`}
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
    </group>
  )
}
