## manychat-contacts

Fetches **Subscribers (Contacts)** information from the ManyChat API using a list of [Facebook PSIDs](https://help.manychat.com/hc/en-us/articles/14281071624348-How-to-export-PSIDs-of-your-Manychat-contacts) (Page-Scoped ID) and writes relevant Contacts data into an Excel file.

### 📋 Requirements

1. NodeJS (recommended v24+)

   ```
   node 24.11.0
   npm 11.6.1
   ```

2. Facebook PSIDs
   - This is a CSV file containing a list of Facebook PSIDs
   - Export this file in ManyChat:<br>
      **Contacts tab** -> **Bulk actions** -> **Export FB Custom Audience**
   - View the `/data/contacts.csv` sample CSV file for reference.

3. Docker (optional)

## 🛠️ Installation

1. Clone the repository.<br>
   ```sh
   git clone https://github.com/weaponsforge/manychat-contacts.git
   ```

2. Install dependencies.<br>
   ```sh
   npm install
   ```

3. Create a **`data`** folder under the root project directory. Put your CSV files containing Facebook PSIDs here.

> [!NOTE]
> 📂 manychat-contacts<br>
> └─ 📂 data<br>
> └─── 📄 fb_custom_audience_01.csv<br>
> └─── 📄 fb_custom_audience_02.csv<br>
> └─── 📄 contacts.csv<br>
> └─── 📄 ...<br>
> └─ 📄 package.json<br>
> └─ 📄 ...<br>
> └─ 📄 README.md

## 🚀 Usage

Using Node

1. Option 1: Run the development list subscribers script with a `--filename` argument.

   Write the filename minus the `.csv` part of your Facebook PSID CSV file (inside the `/data` folder) to the `--filename` argument eg.,

   ```sh
   npm run subscriber:list --filename=fb_custom_audience_01
   ```

2. Option 2: Transpile to JavaScript before running the list subscribers script.

   a. Transpile to JavaScript:

   ```sh
   npm run transpile
   ```

   b. Run the list subscribers script with a `--filename` argument.

   ```sh
   npm start --filename=fb_custom_audience_01
   ```

3. Running **Option 1** or **Option 2** creates an Excel file containing a list of ManyChat Subscribers data inside the `/data` directory. Note its Excel file name from the script logs.

## ⚡Alternate Usage

Using Docker

- **Build the image**
   ```sh
   docker compose build --no-cache
   ```

- **Run the container**
   ```sh
   docker compose up -d
   ```

   `docker compose down` to stop

- **Run the Available Scripts** following the pattern:
   ```sh
   docker exec -it weaponsforge-manychat-lib-dev <AVAILABLE_SCRIPT>
   ```

   See the list of [Available Scripts](#-available-scripts) for more information.

<br>

## 📜 Available Scripts

### `npm start`

Runs the main script (JavaScript) that fetches the subscribers list and writes it to an Excel file. Requires `"npm run transpile"`.

### `subscriber:list`

Runs the main script (TypeScript) that fetches the subscribers list and writes it to an Excel file.

### `npm run transpile`

Builds JavaScript, `.d.ts` declaration files, and map files from the TypeScript source files.

### `npm run transpile:noemit`

Runs type-checking without generating the JavaScript or declaration files from the TypeScript files.

### `npm run lint`

Lints TypeScript source codes.

### `npm run lint:fix`

Fixes lint errors in TypeScript files.

### `docker:debug`

- Runs the `"/src/main.ts"` script in containers with debugging enabled in VSCode.
- Replace the `"/src/main.ts"` file path in the package.json file's `"docker:debug"` script with a target TypeScript file for debugging.
- Launch the VSCode debugger using the following configuration:
   ```json
   {
      "version": "0.2.0",
      "configurations": [
         {
            "type": "node",
            "request": "attach",
            "name": "Attach to Docker",
            "address": "localhost",
            "port": 9229,
            "restart": true,
            "skipFiles": ["<node_internals>/**"],
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/opt/app"
         }
      ]
   }
   ```

@weaponsforge<br>
20260112
