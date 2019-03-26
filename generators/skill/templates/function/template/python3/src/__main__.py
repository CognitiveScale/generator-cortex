from cortex_client import InputMessage, OutputMessage


def main(params):
    msg = InputMessage.from_params(params)
    text = msg.payload.get('text')
    return OutputMessage.create().with_payload({'text': 'Got: ' + text}).to_params()
