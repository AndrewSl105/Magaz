
function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}    </div>
    );
  }

const ExampleReact = () => {
    return (
        <div>
            ExampleReact
            <div>
            <FancyBorder color="blue">
                <h1 className="Dialog-title">
                    Welcome      
                </h1>      
                <p className="Dialog-message">        
                    Thank you for visiting our spacecraft!
                </p>    
                </FancyBorder>
            </div>
        </div>
    )
}

export default ExampleReact;
