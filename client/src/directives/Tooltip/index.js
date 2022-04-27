const init = ( elem, binding ) => {
	const position = binding.arg || "top";
	const tooltipText = binding.value || "Tooltip text";
	elem.setAttribute( "position", position );
	elem.setAttribute( "tooltip", tooltipText );
};

const tooltipDirective = app => {
	app.directive( "tooltip", {
		mounted ( elem, binding ) {
			init( elem, binding );
		},
		updated ( elem, binding ) {
			init( elem, binding );
		}
	});
};


export default tooltipDirective;
