import { shallowMount } from '@vue/test-utils';
import IconsSet from "~/components/Icons/IconsSet.vue";


test("should render default state", async () => {
	const wrapper = shallowMount(IconsSet);
	const symbols = wrapper.findAll('symbol');
	expect(symbols).not.toBeEmpty();
	// add more test for symbols size and so on
})