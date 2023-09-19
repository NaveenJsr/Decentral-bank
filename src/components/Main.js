import React, {Component} from "react";
import bank from '../bank.png';
import tether from '../tether.png'

class Main extends Component {
    render() {
        console.log(this.props.tetherBalance)
      return (
        <div id='content' className="mt-3">
            <table className="table table-borderless text-muted text-center">
                <thead>
                    <tr style={{color: 'Black'}}>
                        <th scope="col">Staking Balance</th>
                        <th scope="col">Reward Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> {window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
                        <td> {window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                    </tr>
                </tbody>
            </table>

            <div className="card mb-2" style={{opacity: '9'}}>
                <form
                onSubmit={(event) => {
                    event.preventDefault()
                    let amount
                    amount = this.input.value.toString()
                    amount = window.web3.utils.toWei(amount, 'Ether')
                    this.props.stakeTokens(amount)
                }}
                 className="mb-3">
                    <div className="mt-3" style={{borderSpacing: '0 lem'}}>
                        <label className="float-left" style={{marginLeft: '15px'}}><b>Stake Tokens</b></label>
                        <span className="float-right mr-3" style={{marginRight:'8px'}}>
                            Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')}
                        </span>
                        <div className="input-group mb-4 ml-3">
                            <input 
                            ref = {(input) => {this.input = input}}
                            type="text"
                            placeholder="0"
                            required />
                            <div className="input-grouped-open">
                                <div className="input-group-text">
                                    <img src={tether} alt="tether" height='20' className="mr-2" />
                                    USDT
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Deposit</button>
                    </div>
                </form>
                <button
                type="submit"
                onClick={(event) => {
                    event.preventDefault(
                        this.props.unstakeTokens()
                    )
                }} 
                className="btn btn-primary btn-lg btn-block">Withdraw</button>
            </div>
        </div>
      );
    }
  }
  
  export default Main;