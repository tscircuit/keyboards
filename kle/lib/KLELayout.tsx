// Define the types for keyboard-layout-editor.com JSON format

export type KLEKey =
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

export type KLELayout = KLEKey[][]
// Helper function to parse keyboard-layout-editor JSON

export const parseKLELayout = (layout: KLELayout) => {
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
        // Determine key label based on the content
        let keyLabel = `K${keyCount}`

        // If the item is a single alphabetical character, use it in the name
        if (item.length === 1 && /^[A-Za-z]$/.test(item)) {
          keyLabel = `K_${item.toUpperCase()}`
        }
        // For numbers 0-9, use K_N format
        else if (item.length === 1 && /^[0-9]$/.test(item)) {
          keyLabel = `K_N${item}`
        }
        // For multi-character items, check if they contain newlines
        else if (item.includes("\n")) {
          const parts = item.split("\n")
          // Check if the last part is alphabetical
          if (
            parts[parts.length - 1].length === 1 &&
            /^[A-Za-z]$/.test(parts[parts.length - 1])
          ) {
            keyLabel = `K_${parts[parts.length - 1].toUpperCase()}`
          }
          // Check if the last part is a number
          else if (
            parts[parts.length - 1].length === 1 &&
            /^[0-9]$/.test(parts[parts.length - 1])
          ) {
            keyLabel = `K_N${parts[parts.length - 1]}`
          }
        }

        keys.push({
          name: keyLabel,
          x: currentX * KEY_SIZE,
          y: -currentY * KEY_SIZE,
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
