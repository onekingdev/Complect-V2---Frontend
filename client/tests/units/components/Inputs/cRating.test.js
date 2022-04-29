import { mount } from '@vue/test-utils'
import cRating from "~/components/Inputs/cRating.vue";



test("should render default component", () => {
	const wrapper = mount(cRating, {
		props: {
			modelValue: 0
		}
	});
	
	expect(wrapper.exists()).toBe(true);
	const stars = wrapper.findAll(".icon-star");
	expect(stars).toHaveLength(5);
	stars.forEach(star => expect(star.classes("active")).toBe( false ));
});