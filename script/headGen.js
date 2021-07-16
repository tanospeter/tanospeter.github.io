var generateHead = function (lang){
  var headID = document.getElementsByTagName('head')[0];
  for (const i of links) {
    link = linkLoader(i);
    headID.appendChild(link);
  }
  var title = document.createElement("title");
  
  if (lang == "en"){
    title.innerHTML = 'Istitute of Geological an Geochemical Research';
  }
  else{
    title.innerHTML = 'Földtani és Geokémiai Kutatóintézet';
  }
  headID.appendChild(title)
}

function linkLoader(l) {
  var link = document.createElement("link");
  link.rel = l.rel;
  link.type = l.type;
  link.sizes = l.sizes;
  link.href = l.href;
  return link;
}

var links = [
  {rel:"icon", type:"image/png", sizes:"192x192", href:"/pics/favicon/android-icon-192x192.png"},
  {rel:"icon", type:"image/png", sizes:"32x32", href:"/pics/favicon/favicon-32x32.png"},
  {rel:"icon", type:"image/png", sizes:"96x96", href:"/pics/favicon/favicon-96x96.png"},
  {rel:"icon", type:"image/png", sizes:"16x16", href:"/pics/favicon/favicon-16x16.png"}  
]

/*
<title>Földtani és Geokémiai Kutatóintézet</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css/style.css" media="all">
<script src="/script/includeHTML.js"></script>
<link rel="apple-touch-icon" sizes="57x57" href="/pics/favicon/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/pics/favicon/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/pics/favicon/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/pics/favicon/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/pics/favicon/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/pics/favicon/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/pics/favicon/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/pics/favicon/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/pics/favicon/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/pics/favicon/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/pics/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/pics/favicon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/pics/favicon/favicon-16x16.png">
<link rel="manifest" href="/pics/favicon/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/pics/favicon/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff"></meta>
*/