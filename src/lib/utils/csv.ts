import { parse } from 'csv-parse'
import { readFile } from './helpers.js'

/**
 * Reads a CSV file into an array of data
 * @param {string} csvFilePath - Full file path to a CSV file.
 * @returns Parsed CSV data
 */
export const csv = (csvFilePath: string): Promise<string[]> => {
  const parser = parse({
    delimiter: ','
  })

  // Read the CSV from filel
  const contents = readFile(csvFilePath)
  const records: string[] = []
  let record

  // Parse CSV contents
  return new Promise(function (resolve, reject) {
    parser.on('readable', () => {
      while ((record = parser?.read()) !== null) {
        records.push(record)
      }
    })

    parser.on('error', (error) => {
      console.error(error.message)
      reject(error.message)
    })

    parser.on('end', () => {
      console.log('[LOG]: Done parsing CSV file')
      resolve(records)
    })

    parser?.write(contents)
    parser?.end()
  })
}
