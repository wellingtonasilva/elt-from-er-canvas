const FONT_16PX = "12px Courier";
var ctx;
var tables = [];

window.onload = function () {
  document
    .getElementById("btn-create")
    .addEventListener("click", onCreateClick);
  document
    .getElementById("btn-read-definition")
    .addEventListener("click", readDefinition);
  initDraw();
};

function initDraw() {
  var canvas = document.getElementById("tutorial");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
  }
}

function onCreateClick() {
  let x = 40;
  let y = 65;
  //Name
  ctx.fillStyle = "rgba(0, 80, 50, 0.30)";
  ctx.fillRect(30, 50, 300, 30);
  //Attributes
  ctx.fillStyle = "rgba(0, 80, 50, 0.10)";
  ctx.fillRect(30, 80, 300, 200);

  ctx.font = "12px Courier";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText("Customer", x, y);

  y += 30;
  drawText("ID", x, y, "#000000");
  y += 25;
  drawText("Description", x, y, "#000000");
  y += 25;
  drawText("Telephone", x, y, "#000000");
  y += 25;
  drawText("Address", x, y, "#000000");
}

function drawText(
  text,
  x,
  y,
  fillStyle = "#ffffff",
  font = "12px Courier",
  textAlign = "start",
  textBaseline = "middle"
) {
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.fillStyle = fillStyle;
  ctx.fillText(text, x, y);
}

function readDefinition() {
  let definition = document.getElementById("definition").value;
  let startDefinition = definition.indexOf("{");
  let endDefinition = definition.indexOf("};");

  while (startDefinition !== -1 && endDefinition !== -1) {
    let json = definition.substring(startDefinition - 1, endDefinition + 1);
    tables.push(JSON.parse(json));
    // Remove table from definition
    definition = definition.replace(
      definition.substring(0, endDefinition + 1),
      ""
    );
    // Find new table
    startDefinition = definition.indexOf("{");
    endDefinition = definition.indexOf("};");
  }

  console.log(tables);
  createTablesFromDefinition(tables);
}

function createTablesFromDefinition(tables) {
  let x = 30;
  let y = 65;
  tables.forEach((table) => {
    createTableFromDefinition(table, x, y);
    x += 250;
  });
}

function createTableFromDefinition(table, x, y) {
  //Name
  ctx.fillStyle = "rgba(0, 80, 50, 0.30)";
  ctx.fillRect(x, 50, 200, 30);
  //Attributes
  ctx.fillStyle = "rgba(0, 80, 50, 0.10)";
  ctx.fillRect(x, 80, 200, table.fields.length * 25);

  x += 10;
  ctx.font = "12px Courier";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText(table.tablename, x, y);
  y += 10;

  table.fields.forEach((field) => {
    y += 20;
    drawText(field.fieldname, x, y, "#000000");
  });
}
