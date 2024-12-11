const Button = ({name, styles}) => {
    return(
        <button className={`${styles}`}>{name}</button>
    )
}

export default Button;