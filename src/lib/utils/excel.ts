import xlsx from 'xlsx'
import fs from 'fs'

/**
 * Writes an array of objects into an Excel file
 * @param {T[]} data - Array of simple `Record<string, string>` objects
 * @param pathToFile - Full file path with path name to write the Excel file
 */
export const writeExcel = <T>(
  data: T[],
  pathToFile: string = 'data.xlsx',
  sheetName: string = 'Contacts'
) => {
  // Create a worksheet and a workbook
  const worksheet = xlsx.utils.json_to_sheet(data)
  const workbook = xlsx.utils.book_new()

  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName)

  try {
    // Write the Excel file using writeFileSync for better error handling
    const buffer = xlsx.write(workbook, {
      type: 'buffer' as const,
      bookType: 'xlsx' as const,
      compression: true
    })

    fs.writeFileSync(pathToFile, buffer)
  } catch (error) {
    if (error instanceof Error) {
      console.log(`[ERROR]: ${error.message}. Fall back to writeFile.`)
    }
    // Fallback to writeFile if writeFileSync fails
    xlsx.writeFile(workbook, pathToFile, { compression: true })
  }
}
