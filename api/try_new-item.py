import requests
import json

# Set up the necessary variables
api_key = 'secret_mXy7oPnetfGiNtAkSsgwGJC16McFAd7M6TomuNdNiV8'
database_id = 'ab55648dbf9e4ff0bd82c97964a8a535'

api_url = 'https://api.notion.com/v1/pages'

# Define the data for the new item
new_item_data = {
    'parent': {
        'database_id': database_id
    },
    'properties': {
        'Name': {
            'title': [
                {
                    'text': {
                        'content': 'Miky Mouse'
                    }
                }
            ]
        },
        'Description': {
            'rich_text': [
                {
                    'text': {
                        'content': 'This is a new item'
                    }
                }
            ]
        }
        # Add more properties as needed
    }
}

# Send a POST request to create the new item
response = requests.post(api_url, headers={
    'Authorization': 'Bearer ' + api_key,
    'Content-Type': 'application/json',
    'Notion-Version': '2021-05-13'
}, data=json.dumps(new_item_data))

# Check the response
if response.status_code == 200:
    print('New item added successfully!')
else:
    print('Failed to add new item. Status code:', response.status_code)
    print('Response:', response.text)
