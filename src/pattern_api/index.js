import config from '../config/config';
import PatternAPI from './patternAPI';


// Instantiate PatternAPI class
const { patternApiUrl } = config
const patternAPI = new PatternAPI(patternApiUrl)
patternAPI.connect()

export default patternAPI;