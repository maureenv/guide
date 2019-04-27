import React from 'react'
import Highlight from 'react-highlight'

const ReactArchitecture = () => {

  return (
    <div className="w-full mb-10 w-750">
      <h1 className="font-bold text-4xl"> React Architecture</h1>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> This "Clean" architecture follows the onion architecture principle, and uses dependency injection to maintain modularity of code. The innermost layer is the component, followed by presenters, services, and finally coordinators as the outermost layer. </p>

      <h3 className="mt-5 font-semibold text-dolphin-blue"> Folder Structure </h3>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-hidden">
        <Highlight className='javascript ml--100'>
          {`
            src/
              behavior/
                coordinators/
                presenters/
                services/
              state/
                actions/
                reducers/
              view/
                components/
                containers/
          `}
        </Highlight>
      </div>
      { /* BEHAVIOR BREAKDOWN */}
      <h2 className="mt-12 mb-3 border-solid border-b pb-2"> Behavior </h2>
      <h3 className="font-semibold text-dolphin-blue"> Coordinators </h3>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> Coordinators execute one use case (such as saving an order) and calls a series of single responsibility services to do this. All API calls will be made in coordinators using the rest service.</p>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> The following is a typical API call use case</p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>
          {`
            const CreateResource = ({ ResourceService, RestService, pRequestResource, pResponseResource }) => async data => {
              // massage request data
              const req = pRequestResource( data )

              // make api call
              let resource = await RestService.post( /api/resource_endpoint, req )

              // massasge response data
              resource = pResponseResource( resource )

              // a resource redux service that saves the resource into redux state, triggering a rerender of any components that use it
              ResourceService.setResource( resource )
            }
          `}
          </Highlight>
      </div>

      <h3 className="mt-10 font-semibold text-dolphin-blue"> Presenters </h3>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> Presenters massage the data that comes to and from the API request/response. For example, a presenter changes Javascript's camelcase code syntax into snakecase before sending it to the Rails API.</p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>
          {`
            const pRequestResource = ({ chefPrice, eventDate, name, price }) => {
              return {
                chef_price: Number( chefPrice.replace( /[$,]/g, ''))
                date: Moment( eventDate, 'MM/DD/YYYY' ).format()
                name,
                price: Number( price.replace( /[$,]/g, '' )),
              }
            }

            const pResponseResource = ({ chef_price, created_at, date, name, price }) => {
              return {
                chefPrice: Number( chef_price.replace( /[$,]/g, '' )).toFixed( 2 ),
                createdAt: Moment( created_at ),
                date: Moment( date ),
                name,
                price: Number( price.replace( /[$,]/g, '' )).toFixed( 2 ),
              }
            }
          `}
        </Highlight>
      </div>

      <h3 className="mt-10 font-semibold text-dolphin-blue"> Services </h3>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> The three areas that services generally cover in our codebase are: Api calls, redux state, and business logic.</p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>
          {`
            // an API calling service
            class RestService extends BaseService {
              post = ( uri, data ) => {
                return axios.request({ method: 'post', url: uri, data })
              }
            }
          `}
        </Highlight>
      </div>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> Here is a redux method on a service. All services are subclasses of the base service which are all instantiated with redux dispatch and getState</p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>
          {`
            class ResourceService extends BaseService {
              setResource = resource => {
                this.dispatch( actions.setResource( resource ))
              }
            }
          `}
        </Highlight>
      </div>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> There can also be business logic methods on services that can be called from coordinators or components. </p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>
          {`
            class ResourceService extends BaseService {
              ......

              calculateTax = ({ items, serviceFee, foodTaxRate, serviceTaxRate }) => {
                const foodTotal = items.reduce(( total, item ) => {
                  return total + item.quantity * item.price
                }, 0 )

                return foodTotal * foodTaxRate + serviceFee * serviceTaxRate
              }
            }
          `}
        </Highlight>
      </div>


      { /* STATE BREAKDOWN */}
      <h2 className="mt-12 mb-3 border-solid border-b pb-2"> State </h2>
      <h3 className="font-semibold text-dolphin-blue"> Actions </h3>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal">Actions are very simple, containing no logic, and just pass information to redux. Actions tell the reducer the possible actions you can take to change a speficic state. In this case, we will be telling the reducer to set and return our resource state when it switches through the possible actions and stops at SET_RESOURCE (the action we have sent).</p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>
          {`
            const SET_RESOURCE = 'SET_RESOURCE'
            const setResource = resource => ({ type: SET_RESOURCE, resource })
          `}
        </Highlight>
      </div>

      <h3 className="mt-10 font-semibold text-dolphin-blue"> Reducers </h3>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal">Logic is avoided in reducers. It just stores and returns the state depending on what action we tell it to take. If no action is given, it will do nothing and return the stored state.</p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>
          {`
            const resource = ( state, action ) => {
              switch( action.type ) {
              case SET_RESOURCE:
                return action.resource
              default:
                return state
              }
            }
          `}
        </Highlight>
      </div>

      { /* VIEW BREAKDOWN */}
      <h2 className="mt-12 mb-3 border-solid border-b pb-2"> View </h2>
      <h3 className="font-semibold text-dolphin-blue"> Components </h3>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> Components are dumb and do not perform any logic. Components are only concerned with how things look and are not aware of the Redux state. They get their data from props and can trigger callbacks passed to them via props (from a container or parent component). Any business logic should be injected as a prop method. In a clean architure, the component should ideally accept primitively-typed components, but we're lazy and just pass in objects of PropType shape. </p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>

          {`
            class ResourcePage extends Component {
              state = {
                chefPrice: ''
                eventDate: ''
                name: '',
                price: '',
              }

              onChange = field => e => {
                this.setState({ [field]: e.target.value })
              }

              onCreateResource = () => {
                const { chefPrice, eventDate, name, price } = this.state
                this.props.createResource( this.state )
              }

              render() {
                const { createResource, resource } = this.props
                const { name } = this.state

                return (
                  <div>
                    <h1>{ resource.name }</h1>

                    <input type="text" value={ chefPrice } onInput={ this.onChange( 'chefPrice' ) }>
                    <input type="text" value={ eventDate } onInput={ this.onChange( 'eventDate' ) }>
                    <input type="text" value={ name } onInput={ this.onChange( 'name' ) }>
                    <input type="text" value={ price } onInput={ this.onChange( 'price' ) }>
                    <button onClick={ this.onCreateResource }>Create Another Resource</button>
                  </div>
                )
              }
            }


            ResourcePage.propTypes = {
              resource: PropType.object,  // this should ideally be at least PropType.shape({ ... }), but we have become a bit lazy with it. The schema can be found in the presenter anyway

              createResource: PropType.func,
            }
          `}
        </Highlight>
      </div>

      <h3 className="mt-10 font-semibold text-dolphin-blue"> Containers </h3>
      <p className="mt-2 text-dolphin-blue font-regular leading-normal"> Containers are a separate file that connect components to the redux store. They receive Redux state updates, inject it into a component as props and dispatch actions. </p>
      <div className="bg-light-gray mt-3 rounded-sm w-full overflow-x-scroll">
        <Highlight className='javascript ml--100'>
          {`
            const mapStateToProps = state => {
              return {
                resource: state.resource,
              }
            }


            const mapDispatchToProps = dispatch => {
              return {
                createResource: data => {
                  const { CreateResource } = coordinators
                  const { ResourceService, RestService } = services
                  const { pRequestResource, pResponseResource } = presenters

                  return CreateResource({ ResourceService, RestService, pRequestResource, pResponseResource })
                }
              }
            }


            export default connect( mapStateToProps, mapDispatchToProps )( ResourcePage )
          `}
        </Highlight>
      </div>
    </div>
  )
}


export default ReactArchitecture
