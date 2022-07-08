import React from 'react'
import {Card} from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, LayersControl, Circle, Popup, WMSTileLayer, FeatureGroup, Polyline } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet/dist/leaflet.css'
import CustControl from './CustControl'
import AdmControl from './AdmControl'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import useGeoLoc from './useGeoLoc'
import BarChart from './BarChart'
import { useSelector, useDispatch } from 'react-redux'
import { addLayer } from '../features/lineSlice'


const Map = ({ownerData, storeData}) => {

  const [owner, setOwner] = useState([{"owner_id":'',"username":"","password":"","store_exists":''}])
  useEffect(() => {
    fetch('http://localhost:5000/owner').then(response => {
      return response.json()
    }).then(ownerData => {setOwner(ownerData)})}, [])

  const [dyData, setdyData] = useState([{"store_id":'',"owner_id":'',"quantity":0,"price_per_unit":0,"name":"","geometry":"","st_x":0,"st_y":0}])
  const [store, setStore] = useState([{"store_id":'',"owner_id":'',"quantity":0,"price_per_unit":0,"name":"","geometry":"","st_x":0,"st_y":0}])
  useEffect(() => {
    fetch('http://localhost:5000/store').then(response => {
      return response.json()
    }).then(storeData => { setStore(storeData); setdyData(storeData) })}, [])

  const [store5, setStore5] = useState([{"store_id":'',"owner_id":'',"quantity":0,"price_per_unit":0,"name":"","geometry":"","st_x":0,"st_y":0}])
  useEffect(() => {
    fetch('http://localhost:5000/top5stores').then(response => {
      return response.json()
    }).then(storeData5 => {setStore5(storeData5)})}, [])

    
  const loc = useGeoLoc(); const {BaseLayer} = LayersControl;

  const [buffer, setBuffer] = useState(0)

  const callbackBuffer = (bufferSize) => { setBuffer(Number(bufferSize)) }
  const callback = (filterData) => { setdyData(filterData) }
  const clearFilterCB = () => { setdyData(store) }

  const fillBlueOptions = { fillColor: 'blue' }

  const iconMarkup = renderToStaticMarkup(<i class="fa-solid fa-shop fa-2x"></i>)
  const customMarkerIcon = divIcon({html: iconMarkup, iconSize:[32,25]})

  const iconMe = renderToStaticMarkup(<i class="fa-solid fa-street-view fa-2x"></i>)
  const customMeIcon = divIcon({html: iconMe, iconSize:[25,25]})

  const location = useLocation()

  const [show, setShow] = useState(false)
  const cbShow = () => {
    setShow(!show)
  }

  const [userData, setUserData] = useState()
  useEffect(() => {
    setUserData({
      labels: store5.map((data5) => data5.name),
      datasets: [
        {
          label: "Quantity of items",
          data: store5.map((data5) => data5.quantity),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    })
  },[store5])


  const [passLyr, setLyr] = useState(); var lyr = []
  const _onCreate = (e) => {
    console.log(e)
    const {layer, layerType} = e
    if(layerType==='polyline') {
      var id = layer['_leaflet_id']
    }
    var data = layer.toGeoJSON(); lyr.push(data)
    setLyr(lyr)
  }

  const _onEdited = (e) => {
    console.log(e)
    const { layers: {_layers} } = e

    Object.values(_layers).map(({_leaflet_id, editing}) => {
      lyr = lyr.map( l => l.id === _leaflet_id ? {...l, latlngs: {...editing.latlngs[0]}} : l
    )})
    console.log(JSON.stringify(lyr))
  }
  const _onDeleted = (e) => {
    console.log(e)
    lyr = []; setLyr()
  }

  const showN = useSelector((state) => state.toggleNetwork.show)
  const ld = useSelector((state) => state.line.lineData)
  const dispatch = useDispatch()
  const plotNetwork = (d) => {
    dispatch(addLayer(d))
  }
    

  return (
    <>
      <div className='rowC'>
      <Card className='text-center top-space ' border='warning'>
        {show===true ? <BarChart chartData={userData} />  :
        <MapContainer center={[33.64506050099049, 72.98846066607508]} zoom={12} >
          
          {location.pathname==='/Admin/' ? 
          <FeatureGroup>
            <EditControl onCreated={_onCreate} onEdited={_onEdited} onDeleted={_onDeleted} draw={{
              polygon:false, polyline:true, circle:false, circlemarker:false, marker:false, rectangle:false
            }} />
          </FeatureGroup>
          : null}

          <LayersControl position="topright">  
            <BaseLayer checked name="Default View">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>

            <BaseLayer name="Satellite View">
              <TileLayer url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" subdomains={['mt1','mt2','mt3']} />
            </BaseLayer>

            <BaseLayer name="Dark View">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            </BaseLayer>
              
            <LayersControl.Overlay name="WMS View">
              <WMSTileLayer 
              url="http://localhost:8080/geoserver/webProject/wms?"
              version="2.20.4"
              layers={"webStore:store"}
              transparent
              format="image/png" />
            </LayersControl.Overlay>

          </LayersControl>

          {loc.loaded && !loc.error && (<>
              <Marker icon={customMeIcon} position={[loc.coordinates.lat, loc.coordinates.lng]}>
                <Popup closeButton={false}>Me</Popup>
              </Marker>
              <Circle center={[loc.coordinates.lat, loc.coordinates.lng]} pathOptions={fillBlueOptions} radius={buffer} />
          </>)}
          
          {dyData.map(pts => {return pts.show===true ?
          <Marker key={pts.store_id} position={[pts.st_y, pts.st_x]} icon={customMarkerIcon} >
            <Popup closeButton={false}>Name: {pts.name} <br></br> Quantity:{pts.quantity} <br></br> Price:{pts.price_per_unit}</Popup> </Marker> 
          : null})}


          {location.pathname==='/Admin/' && ld!==undefined && showN===true ? ld.map(x => {return x.show===true ? 
            <Polyline pathOptions={{color:'red', weight:4}} positions={x.geojson.coordinates} >
              <Popup closeButton={false}>Network id: {x.network_id} <br></br> Length: {x.length}m</Popup> </Polyline> : null})
          : null}


        </MapContainer> }
      </Card>

      <Card className='side-space'>
      {location.pathname==='/' ? <CustControl cb={callback} cbB={callbackBuffer} cbS={cbShow} cF={clearFilterCB} /> 
      : location.pathname==='/Admin/' ? <AdmControl owner={ownerData} store={storeData} mapStore={store} delFeature={_onDeleted} polyline={passLyr} pN={plotNetwork} /> : null}
      </Card>

      </div>
    </>
  )
}

export default Map