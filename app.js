const jugadores = [
 { nombre:"Juan Pérez", equipo:"Equipo A", goles:10, asistencias:5 },
 { nombre:"Carlos López", equipo:"Equipo B", goles:8, asistencias:7 },
 { nombre:"Pedro Osorio", equipo:"Equipo B", goles:11, asistencias:6 },
 { nombre:"Luis Gómez", equipo:"Equipo A", goles:6, asistencias:4 }
];

function renderTabla(lista){
 const tabla=document.getElementById("tablaJugadores");
 tabla.innerHTML="";
 lista.forEach(j=>{
  tabla.innerHTML += `<tr>
    <td>${j.nombre}</td>
    <td>${j.equipo}</td>
    <td>${j.goles}</td>
    <td>${j.asistencias}</td>
  </tr>`;
 });
}

function filtrarJugadores(){
 const texto=document.getElementById("buscador").value.toLowerCase();
 const equipo=document.getElementById("filtroEquipo").value;
 const campo=document.getElementById("ordenCampo").value;
 const tipo=document.getElementById("ordenTipo").value;

 let filtrados=jugadores.filter(j=>{
  return j.nombre.toLowerCase().includes(texto) &&
   (equipo==="" || j.equipo===equipo);
 });

 filtrados.sort((a,b)=>{
  return tipo==="asc"? a[campo]-b[campo] : b[campo]-a[campo];
 });

 renderTabla(filtrados);
}

function crearGrafica(){
 const ctx=document.getElementById("grafica");
 new Chart(ctx,{
  type:'bar',
  data:{
    labels:jugadores.map(j=>j.nombre),
    datasets:[{label:'Goles',data:jugadores.map(j=>j.goles)}]
  }
 });
}

window.onload=()=>{
 filtrarJugadores();
 crearGrafica();
};
