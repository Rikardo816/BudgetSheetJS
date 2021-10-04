alert("Se recomienda eliminar los valores de ejemplo");

const ingresos = [
  new Ingreso("Sueldo", 1200),
  new Ingreso("Venta PC", 500),
];

const egresos = [
  new Egreso("Renta departamento", 400),
  new Egreso("Silla Gamer", 450),
];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    
    return totalEgresos;
};

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
    //Formato de internacionalizacion
    return valor.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits: 2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn">
          <ion-icon name="close-circle-outline"
          onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
        </button>
      </div>
    </div>
  </div>
    `;

    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    console.log('El indice de ingreso eliminado es: ', indiceEliminar);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let porcentajeEgreso = egreso.valor/totalEgresos();
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
        <div class="elemento_eliminar">
          <div class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline"
            onclick='eliminarEgreso(${egreso.id})'></ion-icon>
          </div>
      </div>
    </div>
  </div>
    `;

    return egresoHTML;
}

let eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
    console.log('El indice del egreso eliminado es: ', indiceEliminar);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value)); //el sigo + corresponde a una sintaxis simplifaca de la funcion Number()
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
        document.getElementById('descripcion').value = "";
        document.getElementById('valor').value = "";
    }
    
}