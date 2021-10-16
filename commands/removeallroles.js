// !removeallroles @username
module.exports = {
    name: "removeallroles",
    description: "Removes all of a users roles",
    permissions: "ADMINISTRATOR",
    syntax: "!removeallroles @username",
    execute(msg, args){
        const targetUser = msg.mentions.users.first();
        const perms = "ADMINISTRATOR"

        // Must have administrator permissions in discord to call the command
        if (!msg.member.hasPermission(perms)) {
          msg.channel.send("Must have Discord administrator permissions to use this command.")
          return
        }

        // ensure a user was specified
        if (!targetUser) {
          msg.channel.send(`Please specify a user to remove roles from.`);
          return
        }
        // Get user and remove all roles
        const { guild } = msg
        const member = guild.members.cache.get(targetUser.id)

        member.roles.remove(member.roles.cache)
        msg.channel.send(`Removed all roles from ${targetUser}`)

    }
}