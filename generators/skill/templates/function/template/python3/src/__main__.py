from cortex import Message, Cortex

def main(params):
    msg = Message(params)
    text = msg.payload.get('text')
    cortex = Cortex.client(api_endpoint=msg.apiEndpoint, token=msg.token)
    return cortex.message({'text': 'Got %s!' % text}).to_params()