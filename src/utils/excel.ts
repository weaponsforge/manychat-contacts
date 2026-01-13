import xlsx from 'xlsx'
import fs from 'fs'

/**
 * Writes an array of objects into an Excel file
 * @param {T[]} data - Array of simple `Record<string, string>` objects
 * @param pathToFile - Full file path with path name to write the Excel file
 */
export const writeExcel = <T>(
  data: T[],
  pathToFile: string = 'data.xlsx'
) => {
  // Create a worksheet and a workbook
  const worksheet = xlsx.utils.json_to_sheet(data)
  const workbook = xlsx.utils.book_new()

  xlsx.utils.book_append_sheet(workbook, worksheet, 'Contacts')

  try {
    const options = {
      type: 'buffer',
      bookType: 'xlsx',
      compression: true
    }

    // Write the Excel file using writeFileSync for better error handling
    const buffer = xlsx.write(workbook, options)
    fs.writeFileSync(pathToFile, buffer)
  } catch (error) {
    // Fallback to writeFile if writeFileSync fails
    console.log(`[ERROR]: ${error.message}. Fall back to writeFile.`)
    xlsx.writeFile(workbook, pathToFile, { compression: true })
  }
}
