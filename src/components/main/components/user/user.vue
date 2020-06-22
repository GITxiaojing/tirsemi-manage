<template>
    <div class="user-comp">
        <Dropdown @on-click="handleClick">
            <div class="user-wrapper">
                <Badge dot>
                    <Avatar shape="circle" src="https://i.loli.net/2017/08/21/599a521472424.jpg"></Avatar>
                </Badge>
                <Icon type="md-arrow-dropdown" size=18></Icon>
            </div>
            <DropdownMenu slot="list">
                <DropdownItem name="message">
                    消息中心
                    <Badge class="cus-badge" :count="3"></Badge>
                </DropdownItem>
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
export default {
    name: 'user',
    methods: {
        handleClick (name) {
            if (name === 'message') {
                console.log('message')
            } else {
                console.log('logout')
            }
        }
    }
}
</script>

<style lang="less">
    @import url('./user.less');
</style>