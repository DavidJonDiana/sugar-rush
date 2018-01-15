import React, { Component } from 'react';
import { Item, Button, Input } from 'semantic-ui-react';

class CartListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            quantity: this.props.quantity
        }
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    handleInputChange(e, o) {
        this.setState({ quantity: o.value })
    }
    
    render() {
        const { title, description, imageUrl, category, id } = this.props.product
        return (
            <Item>
                <Item.Image size="tiny" src={imageUrl} />
                <Item.Content>
                    <Item.Header as="a">{title}</Item.Header>
                    <Item.Meta>
                        <span className="category">{category}</span>
                    </Item.Meta>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        <Button onClick={() => this.props.updateCart(id, 0)} primary floated="right">
                            Remove From Cart
                        </Button>
                        <Input onChange={this.handleInputChange} placeholder="Quantity" defaultValue={this.props.quantity} floated="right">
                            <input />
                            <Button onClick={() => this.props.updateCart(id, +this.state.quantity)}>Update</Button>
                        </Input>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )

    }
}

export default CartListItem
