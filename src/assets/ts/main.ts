import { csCalendar } from "./components/csCalendar";
import { csForm } from "./components/csForm";
import { csModal } from "./components/csModal";
import { csTesting } from "./utilities/csTesting";

// call components
new csCalendar().init();
new csModal().init();
new csForm().init();

// call tests
new csTesting().setTestData(true);
