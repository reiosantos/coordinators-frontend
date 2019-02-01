import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const CustomCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.grey[50],
		color: theme.palette.common.black
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

export default CustomCell;
