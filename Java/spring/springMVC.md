# springMVC
MVC is design model for representation

1. get request data
2. call service
3. response according to result 

## Model
public class ExtendedModeMap extends ModelMap implements Model

## ModelMap
public class ModelMap extends LindedHashMap<String,Object>

1. store data in request scope using Model, ModelMap
2. controller reference

common:
1. Model and ModelMap instance auto setup by springMVC, no need user setup
  - return page path

difference
1. Model can receive all kinds of data, ModelMap if receive multiple group data

1. @SessionAttributes put Model/ModelMap 's data into session
2. get data in scope using `el` expression

## ModelAndView
object provided to use controller method 
- can return Model / view
















