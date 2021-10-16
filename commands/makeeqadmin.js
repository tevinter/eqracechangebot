// !makeeqadmin @username
module.exports = {
    name: 'makeeqadmin',
    description: "Gives user the EQAdmin role",
    permissions: 'ADMINISTRATOR',
    syntax: "!makeeqadmin @username",
    execute(msg, args){
        const targetUser = msg.mentions.users.first();
        const roleName = "EQAdmin";
        const perms = "ADMINISTRATOR"

        // Must have administrator permissions in discord to call the command
        if (!msg.member.hasPermission(perms)) {
          msg.channel.send("Must have Discord administrator permissions to use this command.")
          return
        }

        // ensure a user was specified
        if (!targetUser) {
          msg.channel.send(`Please specify a user to give ${roleName} permissions.`);
          return
        }
        
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
          msg.channel.send(`${targetUser} already has ${roleName} role.`)
        }
        else {
          member.roles.add(role)
          msg.channel.send(`${targetUser} updated to have ${roleName} role.`)
        }
        
    }
}