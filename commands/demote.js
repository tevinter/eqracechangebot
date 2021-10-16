// !demote @username roleName
module.exports = {
    name: 'demote',
    description: 'Demotes the user, removing the given role',
    permissions: 'ADMINISTRATOR',
    syntax: '!demote @username roleName',
    execute(msg, args){
        const targetUser = msg.mentions.users.first();
        const perms = 'ADMINISTRATOR'
        
        // Must have administrator permissions in discord to call the command
        if (!msg.member.hasPermission(perms)) {
          msg.channel.send('Must have Discord administrator permissions to use this command.')
          return
        }

        // ensure a user was specified
        if (!targetUser) {
          msg.channel.send(`Please specify a user to demote.`);
          return
        }

        // Get roleName
        args.shift();
        const roleName = args.join(' ');
        
        const { guild } = msg
        const member = guild.members.cache.get(targetUser.id)

        // check to find role and ensure it exists
        const role = guild.roles.cache.find((role) => {
          return role.name === roleName
        })

        if (!role) { // role doesn't exist in the Discord Server
          msg.channel.send(`${roleName} role does not exist.`)
          return
        }

        if (member.roles.cache.some(role => role.name === roleName)) {
          member.roles.remove(role)
          msg.channel.send(`Removed ${roleName} role from ${targetUser}.`)
        }
        else {
          msg.channel.send(`${targetUser} does not have the ${roleName} role.`)
        }
    }
}