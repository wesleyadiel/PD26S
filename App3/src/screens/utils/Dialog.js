import { Dialog } from 'react-native-simple-dialogs';
 
<Dialog
    visible={this.state.dialogVisible}
    title="Custom Dialog"
    onTouchOutside={() => this.setState({dialogVisible: false})} >
    <View>
        <Text>Código</Text>
        <TextInput editable={false}>{codigo}</TextInput>
    </View>
</Dialog>