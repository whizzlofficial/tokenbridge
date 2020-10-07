import React from 'react'

export default class extends React.Component {
  state = {
    txHash: ''
  }

  handleInputChange = event => {
    this.setState({
      txHash: event.target.value
    })
  }

  handleExecuteSignatures = async () => {
    try {
      await this.props.executeSignatures()
      this.props.setError(null)
    } catch (error) {
      console.log(error)
      const message = error.message.includes('Reverted')
        ? 'This withdrawal request was already executed.'
        : error.message
      this.props.setError(message)
    }
  }

  handleSubmitTx = async () => {
    try {
      const { txHash } = this.state
      await this.props.getSignatures(txHash)
      this.handleExecuteSignatures()
      this.props.setError(null)
    } catch (error) {
      console.log(error)
      this.props.setError(error.message)
    }
  }

  render() {
    const { reverse, foreignNetworkName, withInput, error } = this.props
    return (
      <div className="execute-signatures-modal">
        <div className="execute-signatures-modal-container">
          <div className="execute-signatures-title">
            <span className="execute-signatures-title-text">Claim Your Tokens</span>
          </div>
          <div className="execute-signatures-content-container">
            <div className="execute-signatures-content">
              {reverse ? (
                withInput ? (
                  <div className="execute-signatures-content-with-input">
                    <span className="execute-signatures-description">
                      Specify the transaction hash where xDai transfer happened or relayTokens method was called
                    </span>
                    <div className="execute-signatures-form">
                      <div className="execute-signatures-form-input-container">
                        <input
                          onChange={this.handleInputChange}
                          type="text"
                          className="execute-signatures-form-input"
                          placeholder="Transaction hash..."
                        />
                      </div>
                      <div>
                        <button className="execute-signatures-form-button" onClick={this.handleSubmitTx}>
                          Claim
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button onClick={this.handleExecuteSignatures} className="execute-signatures-confirm">
                    Claim
                  </button>
                )
              ) : (
                <p className="transfer-description">
                  Please switch the network in your wallet to <strong>{foreignNetworkName}</strong>
                </p>
              )}
              <span className="execute-signatures-error">{error}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}