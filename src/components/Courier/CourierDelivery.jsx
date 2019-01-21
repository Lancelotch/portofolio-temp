// import React, { Component } from "react";



// class CourierDelivery extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       serviceCode: "",
//       couriers: this.props.couriers
//     };
//   }
//   onChangeCourier = event => {
//     this.setState(
//       {
//         [event.target.name]: event.target.value
//       },
//       () => {
//         this.props.onChangeCourier(this.state.serviceCode);
//       }
//     );
//   };
//   listCouriers = () => {
//     const { classes } = this.props;
//     return this.state.couriers[0].map((courier, index) => (
//       <MenuItem
//         classes={{
//           root: classes.selectMenuItem,
//           selected: classes.selectMenuItemSelected
//         }}
//         key={index}
//         value={courier.serviceCode}
//       >
//         {courier.courierCode + " - " + courier.serviceName + " (" + courier.estimation + ")"}
//       </MenuItem>
//     ));
//   };
//   render() {
//     const { classes } = this.props;
//     return (
//       <div>
//         <FormControl fullWidth className={classes.selectFormControl}>
//           <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
//             {strings.delivery_courier}
//           </InputLabel>
//           <Select
//             MenuProps={{
//               className: classes.selectMenu
//             }}
//             classes={{
//               select: classes.select
//             }}
//             value={this.state.serviceCode}
//             onChange={this.onChangeCourier}
//             inputProps={{
//               name: "serviceCode"
//             }}
//           >
//             {this.listCouriers()}
//           </Select>
//         </FormControl>
//       </div>
//     );
//   }
// }
// CourierDelivery.propTypes = {
//   couriers: PropTypes.arrayOf(Object)
// };
// export default withStyles(styles)(CourierDelivery);
