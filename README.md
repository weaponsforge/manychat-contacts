## manychat-contacts

Fetches **Subscribers (Contacts)** information from the ManyChat API using a list of [Facebook PSIDs](https://help.manychat.com/hc/en-us/articles/14281071624348-How-to-export-PSIDs-of-your-Manychat-contacts) (Page-Scoped ID) and writes relevant Contacts data into an Excel file.

### 📋 Requirements

1. NodeJS (recommended v24+)

   ```
   node 24.11.0
   npm 11.6.1
   ```

2. Facebook PSIDs CSV file
   - This is a CSV file containing a list of Facebook PSIDs
   - Export this file in ManyChat:<br>
      **Contacts tab** -> **Bulk actions** -> **Export FB Custom Audience**
   - View the `/data/contacts.csv` sample CSV file for reference.

3. ManyChat Account
   - With Pro subscription or 14-Day Free Trial

4. ManyChat API Key
   - ManyChat API key generated within your ManyChat account.
   - > ⚠️ The API key and the **Facebook PSIDs** (see requirement #2) should belong under the **same ManyChat account**.

5. Internet Connection
   - Strong WiFi connection
   - > ⚠️ WiFi connection from mobile hotspots does not work.

6. Docker (optional)

## 🛠️ Installation

1. Clone the repository.<br>
   ```sh
   git clone https://github.com/weaponsforge/manychat-contacts.git
   ```

2. Install dependencies.<br>
   ```sh
   npm install
   ```

3. Set up the environment variables. Create a `.env` file inside the root project directory with reference to the `.env.example` file.

   | Variable Name | Description |
   | --- | --- |
   | MANYCHAT_API_DOMAIN | ManyChat API root domain URL |
   | MANYCHAT_API_KEY | ManyChat API key (generated within your ManyChat account).<br><br>⚠️ The API key and the **Facebook PSIDs** (see requirement #2) should belong under the **same ManyChat account**. |
   | FB_PAGE_ID | (Optional) Facebook Page ID connected under the **same ManyChat account**.<br>💡 This is required only when using the  `ManyChatBase.getliveChatURL()` method. |


4. Create a **`data`** folder under the root project directory. Put your CSV files containing Facebook PSIDs here.

> [!NOTE]
> 📂 manychat-contacts<br>
> └─ 📂 data<br>
> └─── 📄 fb_custom_audience_01.csv<br>
> └─── 📄 fb_custom_audience_02.csv<br>
> └─── 📄 contacts.csv<br>
> └─── 📄 contactsData.json<br>
> └─── 📄 ...<br>
> └─ 📄 package.json<br>
> └─ 📄 ...<br>
> └─ 📄 README.md

## 🚀 Usage

Using Node

1. **Option 1: Run the development list subscribers script with a `--filename` argument.**

   a. Write the filename minus the `.csv` part of your Facebook PSID CSV file (inside the `/data` folder) to the `--filename` argument eg.,

   ```sh
   npm run subscriber:list --filename=fb_custom_audience_01
   ```

   b. Append a `--isjson` flag When converting a JSON file containing Contacts data to Excel, eg.,

   ```sh
   npm run subscriber:list --filename=contactsData --isjson
   ```

2. **Option 2: Transpile to JavaScript before running the list subscribers script.**

   a. Transpile to JavaScript:

   ```sh
   npm run transpile
   ```

   b. Run the list subscribers script with a `--filename` argument.

   ```sh
   npm start --filename=fb_custom_audience_01
   ```

   c. Run the read subscribers script with a `--filename` and `--isjson` argument.

   ```sh
   npm start subscriber:list --filename=contactsData --isjson
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
   docker exec -it weaponsforge-manychat-services-dev <AVAILABLE_SCRIPT>
   ```

   See the list of [Available Scripts](#-available-scripts) for more information.

<br>

## 📜 Available Scripts

### `npm start`

Runs the main script (JavaScript) that mirrors everything the `"subscriber:list"` (TypeScript) script does. Requires `"npm run transpile"`.

> [!INFO]
> See the ``"subscriber:list"` script for available argument flags.

### `subscriber:list`

- Runs the main script (TypeScript) that fetches the subscribers list and writes it to an Excel file with the `--filename` argument.

   ```sh
   npm run subscriber:list --filename=fb_custom_audience_01
   ```

- Runs the main script (TypeScript) that reads the subscribers list from a local JSON file writes it to an Excel file with the `--isjson` argument.

   ```sh
   npm run subscriber:list --filename=contactsData --isjson
   ```

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
- Sample usage (`main.ts`):

  ```sh
  docker exec -it weaponsforge-manychat-services-dev npm run docker:debug --filename=contacts
  ```

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

## Data Types

### Excel Output

The Excel output contains the following data in its rows.

| Label | Type | Description |
| --- | --- | --- |
| id | string | Facebook User ID (from PSID) |
| pageId | string | Facebook Page ID |
| firstName | string | Facebook user's first name |
| lastName | string | Facebook user's last name |
| name | string | Facebook user's full name |
| status | string | Facebook user's account status |
| subscribed | number | Date the Facebook user started an interaction with ManyChat (timestamp) |
| profilePic | string | URL link to the Facebook user's avatar (profile picture) in ManyChat |
| liveChatURL | string | URL link to the Facebook user's conversation thread in ManyChat |

### Data Input

1. For the **`npm run subscriber:list --filename`** script,

   See the `"/data/contacts.csv"` CSV file for more information about the required input format.

2. For the **`npm run subscriber:list --filename --isjson`** script,

   See the `"/data/contactsData.csv"` JSON file for more information about the required input format.

## References

- ManyChat API Intro <sup>[[1]](https://help.manychat.com/hc/en-us/articles/14281252007580-Dev-Tools-Basics)</sup>
- ManyChat API Swagger Docs <sup>[[2]](https://api.manychat.com/swagger)</sup>
- Facebook PSID <sup>[[3]](https://help.manychat.com/hc/en-us/articles/14281071624348-How-to-export-PSIDs-of-your-Manychat-contacts)</sup>

@weaponsforge<br>
20260112
