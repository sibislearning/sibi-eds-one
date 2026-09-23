async function createTableHeader(table) {
    let tr = document.createElement('tr');
    let sno = document.createElement('th');sno.appendChild(document.createTextNode('S.No'));tr.appendChild(sno);
    let country = document.createElement('th');country.appendChild(document.createTextNode('Country'));tr.appendChild(country);
    let capital = document.createElement('th');capital.appendChild(document.createTextNode('Capital'));tr.appendChild(capital);
    let continent = document.createElement('th');continent.appendChild(document.createTextNode('Continent'));tr.appendChild(continent);
    let abbreviation = document.createElement('th');abbreviation.appendChild(document.createTextNode('Abbreviation'));tr.appendChild(abbreviation);
    table.appendChild(tr);
}

async function createTableRow(table, row, i) {
    let tr = document.createElement('tr');
    let sno = document.createElement('td');sno.appendChild(document.createTextNode(i));tr.appendChild(sno);
    let country = document.createElement('td');country.appendChild(document.createTextNode(row.country));tr.appendChild(country);
    let capital = document.createElement('td');capital.appendChild(document.createTextNode(row.capital));tr.appendChild(capital);
    let continent = document.createElement('td');continent.appendChild(document.createTextNode(row.continent));tr.appendChild(continent);
    let abbreviation = document.createElement('td');abbreviation.appendChild(document.createTextNode(row.abbreviation));tr.appendChild(abbreviation);
    table.appendChild(tr);
}

function createContinentSelect() {
  const select = document.createElement('select');

  select.classList.add('continent-select');

  const continents = [
    {
      name: 'All Countries',
      sheet: 'default',
    },
    {
      name: 'Asia',
      sheet: 'asia',
    },
    {
      name: 'Europe',
      sheet: 'europe',
    },
    {
      name: 'Africa',
      sheet: 'africa',
    },
    {
      name: 'North America',
      sheet: 'north-america',
    },
    {
      name: 'South America',
      sheet: 'south-america',
    },
    {
      name: 'Oceania',
      sheet: 'oceania',
    },
  ];

  continents.forEach((continent) => {
    const option = document.createElement('option');

    option.value = continent.sheet;
    option.textContent = continent.name;

    select.appendChild(option);
  });

  return select;
}

async function createTable(url, sheet = null) {
    let pathname = url;
    if(sheet && sheet !== 'default'){
        pathname = new URL(url);
        pathname.searchParams.set('sheet', sheet);
    }

    const response = await fetch(pathname);
    const json = await response.json();
    console.log(json);

    const table = document.createElement('table');
    createTableHeader(table);
    json.data.forEach((row, i) => {
        createTableRow(table, row, (i+1));
    });

    return table;
}

export default async function decorate(block) {
    const countries = block.querySelector('a[href$=".json"]');
    console.log(countries);
    if(!countries){
        console.log("no json link found");
        return;
    }
    const jsonUrl = countries.href;

    const parentDiv = document.createElement('div');
    parentDiv.classList.add('countries-block');

    const select = createContinentSelect();
    parentDiv.appendChild(select);

    const table = await createTable(countries.href);
    parentDiv.appendChild(table);

    countries.replaceWith(parentDiv);

    select.addEventListener('change', async (event) => {
        const selectedSheet = select.value;
        console.log("selected sheet - {}", selectedSheet);
        const newTable = await createTable(countries.href, selectedSheet);
        const oldTable = parentDiv.querySelector('table');
        oldTable.replaceWith(newTable);
    });
}