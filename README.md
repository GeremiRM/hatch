<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="hatch" />

&#xa0;

</div>

<h1 align="center">Hatch Challenge</h1>

<hr>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#thought_balloon-assumptions">Assumptions</a> &#xa0; | &#xa0; 
  <a href="#sparkles-how-to-run">How to run</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-approach">Approach</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
</p>

<br>

## :dart: About

Hatch Challenge. It consisted on building a simple converter app, making use of the <a href="https://currencylayer.com/documentation">Currency Layer API </a>. The three currencies that can currently be converted to and from are: USD (US Dollar), EUR (Euro) and CHF (Swiss Franc). 

## :thought_balloon: Assumptions
The only assumptions I had were involving technologies:  

1) While I assumed there would be no issues for using external libraries for styling and such, I decided to instead use SASS for the styling of the application instead of a framework like ChakraUI. The only external library I'm using for this project is Axios to fetch the data from the API.

2) While the project didn't specify it, I assumed there would no issues for using TypeScript instead of JavaScript. 

3) While it was a part of the hints and not of the actual requirements for the project, I assumed that I had to use CurrencyLayer instead of a different API. 


## :sparkles: How to Run

First you need to set up an .env file with the following value:
```bash
REACT_APP_API_KEY=...

```

This is the API KEY you get from CurrencyLayer. To obtain it, you first need to register. 

Once you set that up, open your terminal and run: 

With docker-compose:

```bash
  # On the root of the project (if using linux, remember to add sudo at the begining)
  docker-compose up
```

With npm:

```bash
  npm install
  npm run start
```

If everything went well, the application should be running on localhost:3000


## :checkered_flag: Approach 

How did I approach this project?

Well, first thing I did was to get registered on CurrencyLayer to get the API key and check the structure of the data you get from their API. Here I encountered a problem: The API only returns values based on USD, which meant that to convert from EUR/CHF to USD or from EUR to CHF (and viceversa), since I didn't have those exchange rates, I would need to do one of two things: 

1) Come up with a way to obtain the exchange rates using the USD based rates 
2) Pay 8 bucks to CurrencyLayer. 

Suffice to say, I went with option 1. And it actually was easier than I first imagined. Just a simple matter of diving 1 / USD rate (in the case of EUR/CHF -> USD) or divide both USD rates (EUR -> CHF, USDCHF / USDEUR = EURCHF). No need to give CurrencyLayer any money. 

After that, I started working on the application itself. The app is divided in two pages, the Converter (where the conversions are made), and the History (where the old conversions stored in the localStorage are displayed). Didn't have any issues building both pages. At first, I considered using the ContextAPI to store the amount, the currencies and a couple of others things, however, I ended up deciding there was no need for this. Passing props would be enough. 

After I finished building everything, I started working on the tests. At the moment, there are two tests:

1) An integration test: To test if the conversion is made, the operation is saved in the localStorage and is displayed correctly when the form is submitted.
2) A unit test: To check if the switch "button" (it switches the currencies) worked properly. 

Finally, I cleaned up the code, fixed some minor styling issues, improved the folder structure and dockerized the application. 

## :rocket: Technologies

The following tools were used in this project:

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Docker](https://www.docker.com/)
