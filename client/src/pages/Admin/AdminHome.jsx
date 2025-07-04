import React from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import { useSelector, useStore } from 'react-redux'
const AdminHome = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <Layout>
            <div className="container">
                <h1 className="d-flex flex-column mt-4 ">Welcome Admin <i className='text-success'>{user?.name}</i> </h1>
                <h3>Manage Blood Bank App</h3>
                <hr />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati labore, sed eum voluptatum iusto necessitatibus veniam amet, molestias tempore nulla libero quibusdam deleniti, magni magnam ex reiciendis a asperiores omnis quia? Assumenda rem quos corrupti, provident aliquid libero, sapiente enim, quam totam inventore fuga! Asperiores recusandae consequatur aspernatur debitis tempore. Maiores quaerat nemo eius dignissimos unde aliquam, excepturi doloribus error, delectus architecto rerum assumenda, officiis et natus porro quis nostrum ratione vitae! Necessitatibus nemo deserunt laudantium consequuntur voluptatibus et eum esse minus autem rem accusamus dolorum fugiat, deleniti ullam quisquam dignissimos perferendis cum explicabo illo eveniet ratione repellat eaque. Voluptatibus rem incidunt sint pariatur deleniti hic optio dicta minima placeat enim veniam, omnis nobis repudiandae repellat asperiores nesciunt porro debitis quod accusamus ex magni, possimus beatae. Voluptatibus repellendus perspiciatis id ipsum error, dicta, suscipit obcaecati maiores nam quaerat porro distinctio perferendis quidem reprehenderit minus dolor quis quo aliquid? Dolores iusto ratione cumque? Sit delectus ad consequuntur dolores nam, qui consequatur laudantium quaerat deleniti dolore! Optio est laboriosam architecto laudantium, natus labore provident iusto cum deleniti dicta exercitationem impedit quod sit ad culpa veniam laborum eum repudiandae eos nam ipsa. Molestias sunt nobis cupiditate laborum veritatis? Illum, delectus. Quisquam, debitis magni?</p>
            </div>
        </Layout>
    )
}

export default AdminHome