# Hooks
hooks: lifecycle events

## order of operations
beforeBulkCreate
beforeBulkDestroy
beforeBulkUpdate

## declare hooks
hook may contain async actions

```js
class User extends Model {}
User.init(
  {
    username: xxx,
    mood: xxx
    ...
  }, {
    hooks: {
      beforeValidate: (user,options) => user.mood = 'happy',
      afterValidate: (user,options) => user.username = 'toni'
    }
  }
)

User.beforeCreate((user,options) => {...})
```

## global / universal hooks
define behaviours that want for all models

new Sequelize(..., {
  define: {
    hooks: {
      beforeCreate: () => {

      }
    }
  }
})

# Model
define mapping between model and table

```js
// find
let data = (await Video.findAll({ where: {gid: 2}})).map(i => i.dataValues)
let data = (await Video.findAll({ where: {gid: 2}})).map(i => i.get())

let data = (await Video.findAll({ where: {gid: 2}})) 
data.map(i => i.get('mid'))

// insert
let video = Video.build({mid: 3902, vid:2, gid:4})
await video.save()

// delete
await Video.destroy({where: {id:4 }})

```











