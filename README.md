The expectation is to cover 3 things, which are as follows:
----------------------------------------------------------
A React-based widget that fetches and displays recent earnings along with company logos. Users can click on tickers to view detailed stock quotes on Benzinga.
The widget is designed for embeddability, reusability, and scalability.

**Technologies Used **: **ReactJS, TypeScript, API Implementation, Ag-Grid, Hooks, Custom hooks and Performance Optimization**
1. Fetch the company earnings from the Benzinga Earnings API. (API_KEY: f090a778d74f4450a11ad417ad72740c) - You need to fetch the list of earnings from the API, and take the recent earnings for all the companies within the last quarter. And use the ticker from each of the objects to call the next API which will insert logos into the table.
curl --request GET \ --url 'https://api.benzinga.com/api/v2.1/calendar/earnings?token=API_KEY' \ --header 'accept: <accept>'
2. Add logos. Fetch the logos (using the Benzinga Logo API) for a specific ticker and display that on the appropriate day of the week. SVG images should be used. (mark_vector_light format)
curl --request GET \ --url 'https://api.benzinga.com/api/v2/logos/search?token=API_KEY&search_keys=AAPL%2CTLSA%2CNVDA&search_keys_type=symbol&fields=mark_vector_light,mark_vector_dark' \ --header 'accept: application/json'
Earnings Calendar Widget:
3. Whenever a user clicks on a specific image/ticker then it should redirect to the benzinga quote page. (ex: https://www.benzinga.com/quote/aapl).
4. Search Logo API response for images.
![image](https://github.com/user-attachments/assets/bcef578b-2aea-462e-b2bd-93f7e440d4bf)
5. Earnings API response for all earnings of companies in last quarter.
![image](https://github.com/user-attachments/assets/8a671177-86a4-4eaf-a915-47f3e5f01112)

Final Output UI : 
---------------
![image](https://github.com/user-attachments/assets/b6a270bd-8242-403b-a71e-ccc910680805)

