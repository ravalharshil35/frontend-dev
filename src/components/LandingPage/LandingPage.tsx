import LeftPanel from '../LeftPanel';
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div>
        <LeftPanel/>
      <h1 className={styles.h1}>Welcome to ECA</h1>

    </div>
  )
}

export default LandingPage