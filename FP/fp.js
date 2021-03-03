// const compose = (...fns) => x => fns.reduceRight((y,f) => f(y), x)

const trace = label => value => {
    console.log(`${label}: ${value}`)
    return value
}


// // a => Promise(b)
// const getUserById = id => id === 3 
//     ? Promise.resolve({name: 'Kurt', role: 'Author'}) 
//     : undefined

// // b => Promise(c)
// const hasPermission = ({role}) => (
//     Promise.resolve(role === 'Author')
// )


const composeM = chainMethod => (...ms) => (
    ms.reduce((f,g) => x => g(x)[chainMethod](f) )
)

// const composePromises = composeM('then')
// const label = 'API call composition'

// const res = composeM('then')(hasPermission, getUserById)(4).then(trace(label))

// console.log(res)


// const Id = value => ({
//     map: f => Id.of(f(value)),
//     chain: f => f(value),
//     toString: () => `Id(${value})`
// })

// Id.of = Id

const label = 'Promise composition'

const a = n => Promise.resolve(n+1)
const b = n => Promise.resolve(n*2)
const c = n => Promise.resolve(n+3)

// const h = composeM('then')(a,b,c)


// console.log(g(20)['then'](f).then(x => console.log(x)) )

let h = x => c(x)['then'](y => b(y)['then'](a))

// h(8).then(trace(label))

const composeMap = composeM('map')

const f1 = k => [k+1]
const f2 = k => [k*2]

let res = composeMap(f1, f2, f1)(3)

const gt = i => a => a >= i
const lt = i => a => a >= i
