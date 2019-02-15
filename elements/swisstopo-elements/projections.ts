/* tslint:disable:max-line-length */
import {register} from 'ol/proj/proj4.js'
import proj4 from 'proj4'

proj4.defs('EPSG:21781',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=660.077,13.551,369.344,2.484,1.783,2.939,5.66 +units=m +no_defs')
proj4.defs('EPSG:2056',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs')

register(proj4)
